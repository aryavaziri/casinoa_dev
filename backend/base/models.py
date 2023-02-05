from django.db import models
from django.contrib.auth.models import User, AbstractUser

def data():
    return {"ground":[0,0,0,0,0], "orders":[], "bets":[]}
def ground():
    return {"ground":[0,0,0,0,0]}

class Table(models.Model):
    types = [
        (0, 'Holdem-Texas'),
        (1, 'Omaha'),
    ]
    maxs = [
        (0, '3'),
        (1, '6'),
        (2, '9'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    img = models.ImageField(null=True)
    type = models.IntegerField(choices=types, default=0)
    max = models.IntegerField(choices=maxs, default=1)
    min = models.IntegerField(default=0)
    small = models.IntegerField(null=True, default=1)
    isAvailable = models.BooleanField(default=True)
    online = models.IntegerField(default=0)
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
    user = models.OneToOneField(User, on_delete=models.CASCADE,null=True)
    balance = models.IntegerField(null=True, default=0)
    status = models.IntegerField(null=True, choices=state, default=0, blank=True)
    credit_total = models.IntegerField(default=0, null=True)
    turn = models.BooleanField(default=False)
    dealer = models.BooleanField(default=False)
    small = models.BooleanField(default=False)
    big = models.BooleanField(default=False)
    bet = models.IntegerField(default=0)
    image = models.ImageField(default="/img/avatar1.webp")
    card1 = models.IntegerField(default=0)
    card2 = models.IntegerField(default=0)
    joined_at = models.DateTimeField(null=True)
    left_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.user.first_name)

class Game(models.Model):
    stages = [
        (0, 'Preflap'),
        (1, 'Flap'),
        (2, 'Turn'),
        (3, 'River'),
    ]
    player = models.ManyToManyField(Player, blank=True)
    round = models.AutoField(primary_key=True, editable=False)
    table = models.ForeignKey(Table, on_delete=models.CASCADE, null=True)
    stage = models.IntegerField(choices=stages, default=0)
    turn = models.IntegerField(null=True, default=0)
    changer = models.IntegerField(null=True, default=0)
    small_blind = models.IntegerField(null=True, default=0)
    bet = models.IntegerField(null=True, default=0)
    pot = models.IntegerField(null=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    JSON_data = models.JSONField(default=data)
    JSON_ground = models.JSONField(default=ground)

    def __str__(self):
        return (str(self.round) + " - " + (self.table.name))

