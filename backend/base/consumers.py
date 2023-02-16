import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from channels_redis.core import RedisChannelLayer
from base.serializers import UserSerializer, UserSerializerWithToken, TableSerializer, Table
from django.contrib.auth import get_user_model
from datetime import datetime
import asyncio
from django.contrib.auth.models import AnonymousUser
from base.models import Game, Player, Table

User = get_user_model()


class PokerConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def get_user(self):
        return UserSerializerWithToken(self.scope['user']).data

    @database_sync_to_async
    def add_online(self):
        table = Table.objects.get(_id=self.scope['url_route']['kwargs']['pk'])
        if self.user['id'] in table.JSON_table['online']:
            # self.close()
            print("Adam bashhhhh")
        else:
            table.JSON_table['online'].append(self.user['id'])
            table.save()


            if(TableSerializer(self.table).data['isAvailable']):
                self.addPlayer()
            else:
                print("Table is not available")
        print(table.JSON_table)

    def addPlayer(self):
        player = Player.objects.get(user=self.user['id'])
        table = Table.objects.get(_id=self.scope['url_route']['kwargs']['pk'])
        game = Game.objects.filter(table=table).last()
        player.status = 1
        player.balance += int(self.deposite)
        player.credit_total -= int(self.deposite)
        player.turn = False
        player.dealer = False
        player.big = False
        player.small = False
        player.bet = 0
        player.card1 = 0
        player.card2 = 0
        player.joined_at = datetime.now()
        game.player.add(player)
        player.save()

    @database_sync_to_async
    def gameLeave(self):
        # player = Player.objects.get(user=self.user['id'])
        # game = Game.objects.filter(table=self.groupname).last()
        # if (player.balance > 0):
        #     player.credit_total += player.balance
        #     player.balance = 0
        # player.leftAt = datetime.now()
        # player.save()
        # game.player.remove(player)
        # game.save()
        table = Table.objects.get(_id=self.table)
        try:
            table.JSON_table['online'].remove(self.user['id'])
        except:
            pass
        print(table.JSON_table)
        table.save()


    async def connect(self):
        self.user = await self.get_user()
        self.table = self.scope['url_route']['kwargs']['pk']
        self.deposite = self.scope['deposite']
        if self.user is AnonymousUser() :
            self.close()
        else:
            self.groupname = self.table
            # available = Table.objects.get(_id=self.scope['url_route']['kwargs']['pk']).isAvailable
            # print(available)
            await asyncio.sleep(1)
            await self.add_online()
            await self.accept()
            await self.channel_layer.group_add(
                self.groupname,
                self.channel_name
            )

            await self.channel_layer.group_send(
                self.groupname, {
                    'type': 'hi_message',
                    'time': datetime.now().strftime("%H:%M"),
                    'user': self.user['nick_name'],
                })
            await self.sendDispatch()

    async def sendDispatch(self):
            await self.channel_layer.group_send(
                self.groupname, {
                    'type': 'disp',
                })

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.channel_layer.group_send(
            self.groupname, {
                'type': 'chat_message',
                'message': message,
                'time': datetime.now().strftime("%H:%M"),
                'sender': self.user['nick_name'],
            })
        await self.channel_layer.group_send(
            self.groupname, {
                'type': 'disp',
            })

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'chat',
            'sender': event['sender'],
            'time': event['time'],
            'message': event['message'],
        }))

    async def disp(self, event):
        await self.send(text_data=json.dumps({
            'type': 'dispatch',
            'message': 'Dispatch from socket',
        }))

    async def hi_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'connected',
            'user': event['user'],
            'time': event['time'],
            'message': ' connected now!',
        }))

    async def bye_message(self, event):
        await self.send(text_data=json.dumps({
            'type': 'disconnected',
            'user': event['user'],
            'time': event['time'],
            'message': ' disconnected!',
        }))

    async def disconnect(self, close_code):
        print("On disconnect")
        await self.channel_layer.group_send(
            self.groupname, {
                'type': 'bye_message',
                'time': datetime.now().strftime("%H:%M"),
                'user': self.user['nick_name'],
            })
        await self.channel_layer.group_discard(
            self.groupname,
            self.channel_name
        )

        await self.channel_layer.group_send(
            self.groupname, {
                'type': 'disp',
            })

        await self.gameLeave()

