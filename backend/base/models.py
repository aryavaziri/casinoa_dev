from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Table(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    img = models.ImageField(null=True, blank=True)
    type = models.CharField(max_length=200, null=True, blank=True)
    small = models.IntegerField(null=True, blank=True)
    big = models.IntegerField(null=True, blank=True)
    online = models.IntegerField(null=True, blank=True)
    min = models.IntegerField(null=True, blank=True)
    max = models.IntegerField(null=True, blank=True)
    waiting = models.IntegerField(null=True, blank=True)
    total = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
