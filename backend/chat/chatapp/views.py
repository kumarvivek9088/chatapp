from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import myUser
from .serializers import searchnewUserSerializer,chatMenuSerializer,chatHistorySerializer,chatrequestSerializer
from .models import ChatHistory,chatsMenu,chatrequest
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Q
# Create your views here.
class searchnewUser(APIView):
    def get(self,request,username):
        users = myUser.objects.all().filter(username__icontains = username)
        serializer = searchnewUserSerializer(users,many=True)
        return Response({"result": serializer.data})
    
class chatMenu(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        persons = chatsMenu.objects.all().filter(Q(user1 = request.user.id) | Q(user2=request.user.id))
        serializer = chatMenuSerializer(persons,many=True,context={'request':request})
        # for users in serializer.data:
        #     chats = ChatHistory.objects.all().filter(Q(sender = request.user.id, receiver = users['chatswith']['id']) | Q(receiver = request.user.id, sender = users['chatswith']['id'])).last()
        #     print(users['id'])
        #     if chats is not None:
        #         serializer.data[int(users['id'])].update({"lastmessage":chats.message,'time':chats.sent_at})
        #     # else:
        #     #     serializer.data[int(users['id'])].update({"lastmessage":None,'time':None})
        #     # print(chats.message)
        return Response(serializer.data)
    
class chatshistory(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request,id):
        user = myUser.objects.get(id=id)
        # users = chatsMenu.objects.get(user = request.user.id, chatswith = user)
        # print(users.chatswith)
        # if users is None:
        #     return Response({"message":"no history found"})
        chats = ChatHistory.objects.all().filter(Q(sender = request.user.id, receiver = user) | Q(receiver = request.user.id, sender = user)).order_by('sent_at')
        # users = chatsMenu.objects.get(id=id)
        # chats = ChatHistory.objects.filter(users=users)
        serializer = chatHistorySerializer(chats, many= True)
        return Response(serializer.data,status = status.HTTP_200_OK)
    
    
class chatRequestApi(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        receiver = request.data.get("receiver")
        message = request.data.get("message")
        receiver = myUser.objects.get(username=receiver)
        requestdata = chatrequest.objects.create(sender = request.user,receiver=receiver,message = message)
        serializer = chatrequestSerializer(requestdata)
        return Response({"message":"request sent","success":True,"data":serializer.data},status=status.HTTP_200_OK)
    
    def get(self,request):
        requestdata = chatrequest.objects.filter(Q(sender = request.user)|Q(receiver = request.user))
        serializer = chatrequestSerializer(requestdata,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def put(self,request,id):
        try:
            requestdata = chatrequest.objects.get(id=id,receiver = request.user)
            user = myUser.objects.get(id=requestdata.sender.id)
            users = chatsMenu.objects.create(
                user1 = requestdata.sender,
                user2 = requestdata.receiver
            )
            ChatHistory.objects.create(
                users=users,
                sender = requestdata.sender,
                receiver = requestdata.receiver,
                message = requestdata.message,
                sent_at = requestdata.sent_at
            )
            
            requestdata.delete()
            chats = ChatHistory.objects.all().filter(Q(sender = request.user.id, receiver = user) | Q(receiver = request.user, sender = user.id)).order_by('sent_at')
            serializer = chatHistorySerializer(chats, many= True)
            # return Response({"success":True})
            return Response({"success":True,"data":serializer.data},status = status.HTTP_200_OK)
        except Exception as e:
            return Response({"success":False,"error":str(e)},status=status.HTTP_400_BAD_REQUEST)

class chatInformation(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request,id):
        requestedperson = myUser.objects.get(id=id)
        chatexist = chatsMenu.objects.filter(Q(user1=request.user,user2=requestedperson)|Q(user1=requestedperson,user2=request.user))
        if chatexist:
            chats = ChatHistory.objects.all().filter(Q(sender = request.user.id, receiver = requestedperson) | Q(receiver = request.user.id, sender = requestedperson)).order_by('sent_at')
            serializer = chatHistorySerializer(chats, many= True)
            return Response({"chatexist":True,"requestexist":False,"needtosendrequest":False,"roomid":chatexist[0].id,"data":serializer.data},status = status.HTTP_200_OK)
        else:
            # checking if chat request is already created or not
            requestexist = chatrequest.objects.filter(Q(sender = requestedperson,receiver=request.user)|Q(sender=request.user,receiver=requestedperson))
            if requestexist:
                serializer = chatrequestSerializer(requestexist,many=True)
                return Response({"chatexist":False,"requestexist":True,"needtosendrequest":False,"roomid":None,"data":serializer.data},status=status.HTTP_200_OK)
            else:
                return Response({"chatexist":False,"requestexits":False,"needtosendrequest":True,"roomid":None,"message":"send a request to begin chat"},status=status.HTTP_200_OK)