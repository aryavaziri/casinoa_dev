from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Game, Player
from base.serializers import GameSerializer



@api_view(['GET'])
def getGame(request, pk):
    game = Game.objects.get(round=pk)
    # num = len(game.player)
    # player = []
    # for n in num:
    #     player.append(Player.objects.get(id=pk))
    # serializer2 = GameSerializer(player, many=True)
    serializer = GameSerializer(game, many=False)
    print(type(serializer.data))
    return Response(serializer.data)
