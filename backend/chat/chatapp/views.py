from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import myUser
from .serializers import searchnewUserSerializer
# Create your views here.
class searchnewUser(APIView):
    def get(self,request,username):
        users = myUser.objects.all().filter(username__icontains = username)
        serializer = searchnewUserSerializer(users,many=True)
        return Response({"result": serializer.data})
    
