from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Table, Game, Player
from django.db import models

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'id']

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class UserSerializerWithToken(UserSerializer):
    nick_name = serializers.SerializerMethodField(read_only=True)
    access = serializers.SerializerMethodField(read_only=True)
    refresh = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['email', 'id', 'nick_name','access','refresh']

    def get_nick_name(self, obj):
        serializer = PlayerSerializer(Player.objects.get(user_id=obj.id), many=False)
        return serializer.data['nick_name']
    def get_access(self, obj):
        access_token = AccessToken.for_user(obj)
        return str(access_token)
    def get_refresh(self, obj):
        refresh_token = RefreshToken.for_user(obj)
        return str(refresh_token)


class GameSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(many=True, read_only=True)
    online = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Game
        fields = '__all__'
    def get_online(self, obj):
        return obj.player.count()


maxs = [
    (0, '3'),
    (1, '6'),
    (2, '9'),
]



class TableSerializer(serializers.ModelSerializer):
    online = serializers.SerializerMethodField(read_only=True)
    isAvailable = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Table
        fields = '__all__'
    def get_online(self, obj):
        serializer = GameSerializer(Game.objects.filter(table=obj).last(), many=False)
        # print(serializer2.data['online'])
        return (serializer.data['online'])
    def get_isAvailable(self, obj):
        # print(GameSerializer(Game.objects.filter(table=obj).last(), many=False).data['online'])
        # print(maxs[obj.max][1])
        if((GameSerializer(Game.objects.filter(table=obj).last(), many=False).data['online'])<  int(maxs[obj.max][1])):
            return True
        else:
            return False
        # return False
    

