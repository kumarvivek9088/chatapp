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
        fields = ['id','username', 'email', 'phonenumber', 'firstname', 'lastname', 'profilepic']     


class chatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = "__all__"

class chatMenuSerializer(serializers.ModelSerializer):
    chatswith = myUserSerializer()
    lastmessage = serializers.SerializerMethodField()
    # time = serializers.SerializerMethodField()
    # lastmessages = chatHistorySerializer()
    class Meta:
        model = chatsMenu
        fields = [
            'id',
            'chatswith',
            'lastmessage'
        ]
    
    def get_lastmessage(self,obj):
        last_message = ChatHistory.objects.filter(users__id=obj.id).last()
        if last_message:
            return {
                'message': last_message.message,
                'sent_at': last_message.sent_at
            }
        return None