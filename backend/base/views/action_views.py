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
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def action(request, pk):
    game = Game.objects.filter(table=pk).last()
    action = request.data["act"]
    table = Table.objects.get(_id=pk)
    user = request.user
    new_bet = int(request.data["bet"])

    if(action=="newGame") and len(table.JSON_table['online'])>1:
        game.gameObject = Poker(pk, len(table.JSON_table['online']))
        game.save()
        serializer = GameSerializer(game, many=False)
        async_to_sync(get_channel_layer().group_send)(pk, {'type': 'disp'})
        return Response(serializer.data)

    Poker.userAction(game.gameObject, action, user.id, new_bet)
    serializer = GameSerializer(game, many=False)
    return Response(serializer.data)
