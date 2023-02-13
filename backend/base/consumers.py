import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from base.serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth import get_user_model
from datetime import datetime

User = get_user_model()



class PokerConsumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def get_user(self):
        return UserSerializerWithToken(self.scope['user']).data

    async def connect(self):
        # self.user = (self.scope['user'])
        self.user = await self.get_user()
        self.groupname = self.scope['url_route']['kwargs']['pk']
        await self.channel_layer.group_add(
            self.groupname,
            self.channel_name
        )
        await self.accept()


    async def receive(self, text_data):
        text_data_json = json.loads(text_data) 
        message = text_data_json['message']
        sender = self.user

        await self.channel_layer.group_send(
            self.groupname,{
                'type': 'chat_message',
                'message': message,
                'time': datetime.now().strftime("%H:%M"),
                'sender': sender['nick_name'],
            })

    async def chat_message(self, event):
        pm = event['message']
        sender = event['sender']
        time = event['time']

        await self.send(text_data=json.dumps({
            'type': 'chat',
            'sender': sender,
            'time': time,
            'message': pm,
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.groupname,
            self.channel_name
        )
