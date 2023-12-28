import json
from channels.generic.websocket import WebsocketConsumer,AsyncWebsocketConsumer
from asgiref.sync import async_to_sync,sync_to_async
from user.models import *



class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        # token = self.scope['query_string'].decode('utf-8')
        # print(token)
        self.user = self.scope['user']
        print(self.user)
        if not self.user.is_authenticated:
            self.close()
            print("not authenticated")
        
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()
        
    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,self.channel_name
        )
    
    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        await self.channel_layer.group_send(
            self.room_group_name,{"type":"chat_message","message":message,"user":self.scope['user']}   
        )
    
    
    async def chat_message(self, event):
        message = event["message"]
        user = event['user']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message,"user":user.id}))