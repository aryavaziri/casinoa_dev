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

def myfunc(a):
    if (a.status==1 or a.status==2 or a.status==5):
        return 1
def myfunc2(a):
    if (a.status==1 or a.status==3 or a.status==4 or a.status==5):
        return 1
def resetPlayer(a):
    if(a.status != 1 and a.status != 5):
        a.status = 0
        a.bet = 0
        a.save()

def next(game, order):
    game.turn = order[(order.index(game.turn) + 1) % len(order)]
    while ((Player.objects.get(id=(game.turn)).status == 1) or (Player.objects.get(id=game.turn).status == 5)):
        game.turn = order[(order.index(game.turn) + 1) % len(order)]
    if (game.bet == 0):
        x = map(myfunc,Player.objects.all())
    else:
        x = map(myfunc2,Player.objects.all())
    y= list(x)
    if(y.count(1)==len(order)):
        print("len(order)")
        game.save()
        p = Player.objects.get(id=(game.turn))
        p.turn = False
        p.save()
        nextRound(game, order)

def nextRound(game, order):
    print("len(order)")
    game.turn = game.small_blind
    game.stage += 1
    map(resetPlayer,Player.objects.all())

        



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def action(request, pk):
    table = Table.objects.get(_id=pk)
    game = Game.objects.filter(table=pk).last()
    order = game.JSON_data['orders']
    user = request.user
    action = request.data
    bet = game.bet
    player = Player.objects.get(id=game.turn)
    if(action=="fold"):
        player.status = 1
        player.save()
        next(game,order)
    if(action=="check"):
        if(bet>player.bet):
            print("adam bash")
        else:
            player.status = 2
            player.save()
            next(game,order)
    if(action=="call"):
        player.balance -= bet
        player.bet = bet
        player.status=3
        player.save()
        next(game,order)
    if(action=="raise"):
        player.status=4
        player.save()
        next(game,order)
    if(action=="allin"):
        player.status=5
        player.save()
        next(game,order)

    print("end")
    player.turn = False
    player.save()
    player2 = Player.objects.get(id=game.turn)
    player2.turn = True
    player2.save()

    # game.turn %= len(order)
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
    game.turn = new_order[(new_order.index(small) + 2) % len(new_order)]
    game.JSON_data['ground']= poker.ground
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
        player.card1=poker.playerCards[p][0]
        player.card2=poker.playerCards[p][1]
        player.save()
    game.save()
    serializer = GameSerializer(game, many=False)
    return Response(serializer.data)
