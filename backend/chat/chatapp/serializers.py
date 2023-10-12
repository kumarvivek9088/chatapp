from rest_framework import serializers
from user.models import myUser
from .models import ChatHistory,chatsMenu
class searchnewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = myUser
        fields = [
            'id',
            'username',
            'email',
            'profilepic'
        ]
class myUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = myUser
        fields = ['username', 'email', 'phonenumber', 'firstname', 'lastname', 'profilepic']     
class chatMenuSerializer(serializers.ModelSerializer):
    chatswith = myUserSerializer()
    class Meta:
        model = chatsMenu
        fields = "__all__"