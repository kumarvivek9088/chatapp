from rest_framework import serializers
from user.models import myUser
class searchnewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = myUser
        fields = [
            'id',
            'username',
            'email',
            'profilepic'
        ]