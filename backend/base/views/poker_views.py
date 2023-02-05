from django.shortcuts import render
from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken
import datetime
from base.poker import Poker
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Game, Player, Table
from base.serializers import GameSerializer, PlayerSerializer


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
    if (table.isAvailable):
        player.balance = player.balance + deposite
        player.status = 1
        player.credit_total = player.credit_total - deposite
        player.turn = False
        player.dealer = False
        player.big = False
        player.small = False
        player.bet = 0
        player.card1 = 0
        player.card2 = 0
        player.joined_at = datetime.datetime.now()
        game.player.add(player)
        player.save()
        serializer = GameSerializer(game, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def newGame(request, pk):
    table = Table.objects.get(_id=pk)
    oldGame = Game.objects.filter(table=pk).last()
    small = 0
    order = []

    for player in oldGame.player.all().order_by('joined_at'):
        order.append(player.id)
    game = Game.objects.create(table=table)

    for player in oldGame.player.all():
        if (player.balance > (table.small * 2)):
            game.player.add(player)

    new_order = []
    for player in game.player.all().order_by('joined_at'):
        new_order.append(player.id)

    pre_small = oldGame.small_blind  # get ID of previous small blind on the table
    try:
        i=0
        while i < len(order):
            small = order[(order.index(pre_small) + 1 + i) % len(order)]
            if(new_order.count(small)):
                break
            i+=1
    except:
        small = new_order[0]
    poker = Poker(len(new_order))
    game.small_blind = small
    game.bet = table.small*2
    game.pot = table.small*3
    # game.turn = (small+2) % len(new_order)
    game.turn = new_order[(new_order.index(small) + 2) % len(new_order)]
    game.JSON_data['ground']= poker.ground
    game.JSON_data['bets']= [0] * len(new_order)
    game.JSON_data['playerCards']= poker.playerCards
    game.JSON_data['orders']= new_order
    print(Player.objects.get(id=new_order[1]).card1)
    for p in range(len(new_order)):
        player = Player.objects.get(id=new_order[(p + new_order.index(small))% len(new_order)])
        player.small = False
        player.big = False
        player.turn = False
        player.dealer = False
        player.bet = 0
        player.status = 0
        # print(player.id)
        if(p==0):
            player.small = True
            player.bet = table.small
        elif(p==1):
            player.big = True
            player.bet = table.small * 2
        if(p==len(new_order)-1):
            player.dealer = True
        if(p==2%len(new_order)):
            player.turn = True
        player.balance -= player.bet
        player.card1=game.JSON_data['playerCards'][(p + new_order.index(small))% len(new_order)][0]
        player.card2=game.JSON_data['playerCards'][(p + new_order.index(small))% len(new_order)][1]
        player.save()
    
    game.save()




    serializer = GameSerializer(game, many=False)
    return Response(serializer.data)
