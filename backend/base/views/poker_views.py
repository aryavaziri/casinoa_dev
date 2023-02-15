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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getGame(request, pk):
    game = Game.objects.filter(table=pk).last()
    serializer2 = GameSerializer(game, many=False)
    return Response(serializer2.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def gameLeave(request, pk):
    user = request.user
    player = Player.objects.get(user=user)
    game = Game.objects.filter(table=pk).last()
    if (player.balance > 0):
        player.credit_total += player.balance
        player.balance = 0
    player.leftAt = datetime.datetime.now()
    player.save()
    game.player.remove(player)
    game.save()
    serializer = GameSerializer(game, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def gameEnter(request, pk):
    table = Table.objects.get(_id=pk)
    game = Game.objects.filter(table=pk).last()
    user = request.user
    deposite = request.data
    player = Player.objects.get(user=user)
    print (TableSerializer(table,many=False).data['isAvailable'])
    # if (TableSerializer(table,many=False).data['isAvailable']):
    #     addPlayer(player, pk, deposite)
    serializer = GameSerializer(game, many=False)
    return Response(None)
        # if (TableSerializer(table,many=False).data['isAvailable']):


# def addPlayer(player, pk, deposite):
#     table = Table.objects.get(_id=pk)
#     game = Game.objects.filter(table=table).last()
#     player.status = 1
#     player.balance += deposite
#     player.credit_total -= deposite
#     player.turn = False
#     player.dealer = False
#     player.big = False
#     player.small = False
#     player.bet = 0
#     player.card1 = 0
#     player.card2 = 0
#     player.joined_at = datetime.datetime.now()
#     game.player.add(player)
#     player.save()





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def newGame(request, pk):
    game = Game.objects.filter(table=Table.objects.get(_id=pk)).last()
    if not game:
        game = Game.objects.create(table=Table.objects.get(_id=pk))
    poker = Poker(int(pk))
    serializer = GameSerializer(game, many=False)
    return Response(serializer.data)

    





# def game_start(pk):