# from models import *
# from serializers import *
import datetime
from base.models import Table, Game, Player
from base.serializers import GameSerializer, TableSerializer, PlayerSerializer
import random


class Poker:
    def __init__(self, players):
        self.players = players
        self.cards = list(range(1,53))
        random.shuffle(self.cards)
        print(self.cards)
        self.playerCards = []
        for p in range(self.players):
            self.playerCards.append([self.cards[p], self.cards[p + self.players]])
        self.ground = [self.cards[(self.players * 2) + 1],self.cards[(self.players * 2) + 2],self.cards[(self.players * 2) + 3],self.cards[(self.players * 2) + 5],self.cards[(self.players * 2) + 7]]


    def newGame(self, pk):
        table = Table.objects.get(_id=pk)
        game = Game.objects.all()
        # oldGame = Game.objects.filter(table=pk).last()
        print(table)

        # small = 0
        # order = []
        # for player in oldGame.player.all().order_by('joined_at'):
        #     order.append(player.user)
        # game = Game.objects.get_or_create(table=table)
        # print(game)
        # for player in oldGame.player.all():
        #     if (player.balance > (table.small * 2)):
        #         game.player.add(player)
        # new_order = []
        # for player in game.player.all().order_by('joined_at'):
        #     new_order.append(player.user)
        # pre_small = oldGame.small_blind  # get ID of previous small blind on the table
        # try:
        #     i=0
        #     while i < len(order):
        #         small = order[(order.index(pre_small) + 1 + i) % len(order)]
        #         if(new_order.count(small)):
        #             break
        #         i+=1
        # except:
        #     small = new_order[0]
        # poker = Poker(len(new_order))
        # game.small_blind = small
        # game.bet = table.small*2
        # game.pot = table.small*3
        # game.turn = new_order[(new_order.index(small) + 2) % len(new_order)]
        # game.JSON_data['ground']= poker.ground
        # game.JSON_data['bets']= [0] * len(new_order)
        # game.JSON_data['playerCards']= poker.playerCards
        # game.JSON_data['orders']= new_order
        # print(Player.objects.get(id=new_order[1]).card1)
        # for p in range(len(new_order)):
        #     player = Player.objects.get(id=new_order[(p + new_order.index(small))% len(new_order)])
        #     player.small = False
        #     player.big = False
        #     player.turn = False
        #     player.dealer = False
        #     player.bet = 0
        #     player.status = 0
        #     if(p==0):
        #         player.small = True
        #         player.bet = table.small
        #     elif(p==1):
        #         player.big = True
        #         player.bet = table.small * 2
        #     if(p==len(new_order)-1):
        #         player.dealer = True
        #     if(p==2%len(new_order)):
        #         player.turn = True
        #     player.balance -= player.bet
        #     player.card1=game.JSON_data['playerCards'][(p + new_order.index(small))% len(new_order)][0]
        #     player.card2=game.JSON_data['playerCards'][(p + new_order.index(small))% len(new_order)][1]
        #     player.save()
        # game.save()
        serializer = GameSerializer(game, many=False)
        return serializer.data
