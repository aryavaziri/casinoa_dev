from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.decorators import api_view,permission_classes
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

