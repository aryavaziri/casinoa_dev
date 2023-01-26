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


class Player(models.Model):
    state = [
        (0, ''),
        (1, 'Fold'),
        (2, 'Check'),
        (3, 'Call'),
        (4, 'Raise'),
        (5, 'Allin'),
    ]
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    balance = models.IntegerField(null=True, blank=True)
    state = models.IntegerField(null=True, choices=state, default=0)
    turn = models.BooleanField(default=False)
    dealer = models.BooleanField(default=False)
    small = models.BooleanField(default=False)
    big = models.BooleanField(default=False)
    bet = models.IntegerField(null=True, blank=True)
    image = models.ImageField(null=True)
    card1 = models.IntegerField(default=0, blank=True)
    card2 = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return self.user.first_name


class Game(models.Model):
    stage = [
        (0, 'Preflap'),
        (1, 'Flap'),
        (2, 'Turn'),
        (3, 'River'),
    ]
    round = models.AutoField(primary_key=True, editable=False)
    player = models.ManyToManyField(Player)
    table = models.ForeignKey(Table, on_delete=models.CASCADE, null=True)
    bet = models.IntegerField(null=True, blank=True)
    stage = models.IntegerField(choices=stage, default=0)
    pot = models.IntegerField(default=0)
    ground = models.JSONField(default=[], blank=True)
    # lastRoundReset = models.DateTimeField(null=True, on_delete=models.CASCADE, blank=True)
    # lastStateChange = models.DateTimeField(null=True, on_delete=models.CASCADE, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.table.name
