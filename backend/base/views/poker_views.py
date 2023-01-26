from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Game, Player
from base.serializers import GameSerializer, PlayerSerializer



@api_view(['GET'])
def getGame(request, pk):
    # game = Game.objects.get(round=pk)
    game = Game.objects.all()
    player = Player.objects.all()
    serializer1 = PlayerSerializer(player, many=True)
    serializer2 = GameSerializer(game, many=True)
    # print(User.player.game__set.all())
    return Response(serializer2.data)
