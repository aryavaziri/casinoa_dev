from django.shortcuts import render
from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken
from datetime import datetime
from base.poker import Poker
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Game, Player, Table
from base.serializers import GameSerializer, PlayerSerializer

# def myfunc(a):
#     # print("MYFUNC")
#     if (a.status==1 or a.status==2 or a.status==5):
#         return 1
# def myfunc2(a):
#     # print("MYFUNC2")
#     if (a.status==1 or a.status==3 or a.status==4 or a.status==5):
#         return 1
# def resetPlayer(a):
#     # print("PLAYER RESET")
#     a.turn = False
#     a.bet = 0
#     if(a.status != 1 and a.status != 5):
#         # print("not CHECK_ALLIN")
#         a.status = 0
#         a.save()
#     return
# def nextRound(game, order):
#     temp = map(resetPlayer,game.player.all())
#     temp2 = list(temp)
#     print(temp2)
#     print("NEXT ROUND")
#     game.turn = game.small_blind
#     game.stage += 1
#     if(game.stage == 1):
#         game.JSON_ground['ground'][0]= game.JSON_data['ground'][0]
#         game.JSON_ground['ground'][1]= game.JSON_data['ground'][1]
#         game.JSON_ground['ground'][2]= game.JSON_data['ground'][2]
#     if(game.stage == 2):
#         game.JSON_ground['ground'][3]= game.JSON_data['ground'][3]
#     if(game.stage == 3):
#         game.JSON_ground['ground'][4]= game.JSON_data['ground'][4]
#     if(game.stage == 4):
#         print("NEXT GAME")
#     game.save

# def next(game, order):
#     while ((Player.objects.get(user=(game.turn)).status == 1) or (Player.objects.get(user=game.turn).status == 5)):
#         game.turn = order[(order.index(game.turn) + 1) % len(order)]
#     # if (game.bet >= game.player.get(id=game.turn).bet ):
#     #     x = map(myfunc,game.player.all())
#     # else:
#     #     x = map(myfunc2,game.player.all())
#     x = map(myfunc,game.player.all())
#     y= list(x)
#     print("yyyyyyyyyyyyyyyyyyyyyyyy")
#     print(y)
#     game.turn = order[(order.index(game.turn) + 1) % len(order)]
#     game.save()
#     if(y.count(1)==len(order)):
#         print("len(order)")
#         p = Player.objects.get(user=(game.turn))
#         p.turn = False
#         p.save()
#         nextRound(game, order)


        



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def action(request, pk):
    game = Game.objects.filter(table=pk).last()
    action = request.data["act"]

    if(action=="newGame"):
        game.gameObject = Poker(pk)
        game.save()
        

        serializer = GameSerializer(game, many=False)
        return Response(serializer.data)


    user = request.user
    new_bet = int(request.data["bet"])
    # if(game.turn == user.id):
    #     Poker.userAction(game.gameObject, action, user.id, new_bet)
    Poker.userAction(game.gameObject, action, user.id, new_bet)



    

    # table = Table.objects.get(_id=pk)
    # order = game.JSON_data['orders']
    # bet = game.bet
    # player = Player.objects.get(user=game.turn)
    # if((action=="check" and bet > player.bet) or (action=="call" and bet == 0) or (action=="raise" and ((new_bet<bet*2) or ((bet==0) and (new_bet < table.small * 2))))):
    #     print("adam bash")

    # else:
    #     print(game.gameObject)
        
    #     if(action=="fold"):
    #         player.status = 1
    #         Poker.userAction(game.gameObject, "fold")

    #     if(action=="check"):
    #         player.status = 2

    #     if(action=="call"):
    #         player.status = 3
    #         player.balance -= bet - player.bet
    #         game.pot += bet - player.bet
    #         player.bet = bet

    #     if(action=="raise"):
    #         game.JSON_data['bets'] = [(i if (i==1 or i==5) else 0) for i in game.JSON_data['bets']]
    #         for i in range(0,len(game.JSON_data['bets'])):
    #             p=Player.objects.get(user=order[i])
    #             if(game.JSON_data['bets'][i]!=1 and game.JSON_data['bets'][i]!=5):
    #                 p.status = 0
    #                 p.save()
    #         player.status = 4
    #         player.balance -= new_bet - player.bet
    #         game.pot += new_bet - player.bet
    #         player.bet = new_bet
    #         game.bet = new_bet

    #     game.JSON_data['bets'][(order.index(game.turn))]=player.status
    #     player.turn=False
    #     player.save()

    #     if(game.JSON_data['bets'].count(0)):
    #         game.turn = (order[(order.index(game.turn)+1 )%len(order)])
    #         while(Player.objects.get(user=game.turn).status == 1 or Player.objects.get(user=game.turn) == 5):
    #             game.turn = (order[(order.index(game.turn)+1 )%len(order)])
    #         nextPlayer = Player.objects.get(user=game.turn)
    #         nextPlayer.turn = True
    #         nextPlayer.save()
    #         print("next player")
    #     else:
    #         for i in range(len(game.JSON_data['bets'])):
    #             if(game.JSON_data['bets'][i]!=1 and game.JSON_data['bets'][i]!=5):
    #                 print(order[i])
    #                 temp = Player.objects.get(user=order[i])
    #                 temp.status = 0
    #                 if(order[i]== game.small_blind):
    #                     temp.turn = True
    #                 temp.bet = 0
    #                 temp.save()
    #         print("next round")
    #         game.JSON_data['bets'] = [(i if (i==1 or i==5) else 0) for i in game.JSON_data['bets']]
    #         if(game.stage<=4):
    #             game.stage += 1
    #         game.turn = game.small_blind
    #         game.bet = 0

    #         if(game.stage == 1):
    #             game.JSON_ground['ground'][0]= game.JSON_data['ground'][0]
    #             game.JSON_ground['ground'][1]= game.JSON_data['ground'][1]
    #             game.JSON_ground['ground'][2]= game.JSON_data['ground'][2]
    #         if(game.stage == 2):
    #             game.JSON_ground['ground'][3]= game.JSON_data['ground'][3]
    #         if(game.stage == 3):
    #             game.JSON_ground['ground'][4]= game.JSON_data['ground'][4]
    #         if(game.stage == 4):
    #             print("NEXT GAME")
    #             #Here we should add code to see who is the winner and how the pot will devide
    #             game.isFinished = True
    #             game.save()

    #     print(game.JSON_data['bets'])

    # game.save()
    serializer = GameSerializer(game, many=False)
    return Response(serializer.data)