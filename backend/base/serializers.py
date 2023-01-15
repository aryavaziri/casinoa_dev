from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Table


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'
