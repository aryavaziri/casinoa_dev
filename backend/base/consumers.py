import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync, sync_to_async
from django.contrib.auth.models import User

class PokerConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        sender = self.scope['user']
        print(self.scope['user'])
        self.groupname = self.scope['url_route']['kwargs']['pk']
        # other_user =await sync_to_async(User.objects.get)(username=self.scope['url_route']['kwargs']['username'])
        await self.channel_layer.group_add(
            self.groupname,
            self.channel_name
        )
        await self.accept()

        await self.channel_layer.group_send(
            self.groupname,
            {
                'type': 'tester_arya',
                'test': str(sender.id)+' connected!',
            })

    async def tester_arya(self, event):
        test = event['test']
        await self.send(text_data=json.dumps({
            'test': test,
            'message': '',
        }))

    async def chat(self, event):
        pm = event['message']
        await self.send(text_data=json.dumps({
            'message': pm,
            # 'sender': sender,
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.groupname,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        # other_user =await sync_to_async(User.objects.get)(username=self.scope['url_route']['kwargs']['username'])
        # print(sender)
        # print(other_user)
        print(self.scope['user'])

        await self.channel_layer.group_send(
            self.groupname,
            {
                'type': 'chat',
                'message': message,
                # 'sender': sender,
            })

    pass
