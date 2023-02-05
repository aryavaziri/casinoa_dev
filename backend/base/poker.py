# from models import *
# from serializers import *
import datetime

import random


class Poker:
    def __init__(self, players):
        self.players = players
        self.cards = list(range(1,53))
        random.shuffle(self.cards)
        # print(self.cards)
        self.playerCards = []
        for p in range(self.players):
            self.playerCards.append([self.cards[p], self.cards[p + self.players]])
        self.ground = [self.cards[(self.players * 2) + 1],self.cards[(self.players * 2) + 2],self.cards[(self.players * 2) + 3],self.cards[(self.players * 2) + 5],self.cards[(self.players * 2) + 7]]
        # print(self.playerCards)            
        # print(self.ground)            
    # class Player:
    #     def __init__(self, name, balance, status, action, bet):
    #         self.name = name
    #         self.balance = balance
    #         self.status = status
    #         self.action = action
    #         self.bet = bet

