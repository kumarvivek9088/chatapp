from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import myUser
from .serializers import searchnewUserSerializer,chatMenuSerializer,chatHistorySerializer
from .models import ChatHistory,chatsMenu
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
        persons = chatsMenu.objects.all().filter(user = request.user.id)
        serializer = chatMenuSerializer(persons,many=True)
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
        chats = ChatHistory.objects.all().filter(Q(sender = request.user.id, receiver = user) | Q(receiver = request.user.id, sender = user))
        serializer = chatHistorySerializer(chats, many= True)
        return Response(serializer.data,status = status.HTTP_200_OK)
    
    
        
        
        