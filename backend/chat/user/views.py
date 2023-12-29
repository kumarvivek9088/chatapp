from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import myUserSerializers
from rest_framework_simplejwt.tokens import AccessToken,RefreshToken
from .models import myUser
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import  JWTAuthentication
# Create your views here.


class signup(APIView):
    def post(self,request):
        data = request.data
        serializer = myUserSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            user = myUser.objects.get(email = request.data['email'])
            user.set_password(request.data['password'])
            user.save()
            token  = AccessToken.for_user(user)
            return Response({"message":"User Created Successfully","status":True,"token":str(token),"email":user.email,"username":user.username},status=status.HTTP_201_CREATED)
        else:
            return Response({"status":False,"error":serializer.error_messages})


class Signin(APIView):
    def post(self,request):
        user = authenticate(username = request.data['username'],password = request.data['password'])
        if user:
            # token = RefreshToken.for_user(user)
            token  = AccessToken.for_user(user)
            return Response({"message":"login successfull","status":True,"token":str(token),"username":user.username,"email":user.email},status=status.HTTP_200_OK)
        else:
            return Response({"message":"username or password isn't match","status":False})

class edituserDetails(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user = myUser.objects.get(username=request.user)
        serializer = myUserSerializers(user)
        return Response(serializer.data)
    def put(self,request,id):
        user = myUser.objects.get(id=id)
        serializer = myUserSerializers(user)
        return Response(serializer.data)
    def patch(self,request,id):
        user = myUser.objects.get(id=id)
        serializer = myUserSerializers(user)
        return Response(serializer.data)


class searchUser(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        search = request.data.get('search')
        if search is None:
            return Response({"result":None})
        
        result = myUser.objects.filter(username__icontains = search)
        serializer = myUserSerializers(result,many=True)
        return Response({"result":serializer.data})