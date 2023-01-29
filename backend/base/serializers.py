from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Table, Game, Player
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken


class UserSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    credit = serializers.SerializerMethodField(read_only=False)
    # player = PlayerSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'isAdmin','credit']

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_credit(self, obj):
        serializer = PlayerSerializer(Player.objects.get(user=obj), many=False)
        # print(serializer.data['credit_total'])
        return serializer.data['credit_total']
        # return PlayerSerializer(Player.objects.get(obj), many=False).data['credit']


class UserSerializerWithToken(UserSerializer):
    refresh_token = serializers.SerializerMethodField(read_only=True)
    access_token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'isAdmin', 'access_token', 'refresh_token']
    def get_refresh_token(self, obj):
        refresh_token = RefreshToken.for_user(obj)
        return str(refresh_token)

    def get_access_token(self, obj):
        access_token = AccessToken.for_user(obj)
        return str(access_token)

class PlayerSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Player
        fields = '__all__'
    def get_name(self, obj):
        return obj.user.first_name

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
    

