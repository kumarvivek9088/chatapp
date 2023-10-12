from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import myUser
from .serializers import searchnewUserSerializer,chatMenuSerializer
from .models import ChatHistory,chatsMenu
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
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
        return Response({"data": serializer.data})
    
        
        
        