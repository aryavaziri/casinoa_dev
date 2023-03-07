from django.shortcuts import render
from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken
import datetime
from base.poker import Poker
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Game, Player, Table
from base.serializers import GameSerializer, PlayerSerializer, TableSerializer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getGame(request, pk):
    game = Game.objects.filter(table=pk).last()
    serializer2 = GameSerializer(game, many=False)
    return Response(serializer2.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRound(request, pk):
    game = Game.objects.get(round=pk)
    serializer2 = GameSerializer(game, many=False)
    return Response(serializer2.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def gameLeave(request, pk):
    user = request.user
    player = Player.objects.get(user=user)
    game = Game.objects.filter(table=pk).last()
    player.credit_total += player.balance
    player.balance = 0
    player.leftAt = datetime.datetime.now()
    player.save()
    try:
        if game:
            game.player.remove(player)
            game.save()
        serializer = GameSerializer(game, many=False)
        return Response(serializer.data)
    except:
        pass


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def gameEnter(request, pk):
    game = Game.objects.filter(table=pk).last()
    serializer = GameSerializer(game, many=False)
    return Response(serializer.data)

    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def action(request, pk):
    game = Game.objects.filter(table=pk).last()
    action = request.data["act"]
    table = Table.objects.get(_id=pk)
    user = request.user
    new_bet = int(request.data["bet"])
    
    if game.isFinished and action=="NewGame":
        if len(table.JSON_table['online'])>1:
            Poker(pk)
    else:
        if game:
            Poker.userAction(game.gameObject, action, user.id, new_bet)
    serializer = GameSerializer(game, many=False)
    return Response(serializer.data)
