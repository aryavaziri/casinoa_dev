from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Table, User
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken


class UserSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'isAdmin']

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

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

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'
