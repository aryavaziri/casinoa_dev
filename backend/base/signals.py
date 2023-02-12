from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User
from .models import Table, Game, Player

# def createPlayer(sender, instance, **kwargs):
#     player = instance
#     player.image = "localhost:8000"+player.image

def createGame(sender, instance, **kwargs):
    table = instance
    if(len(Game.objects.filter(table=table)) == 0):
        game = Game.objects.create(table=table)
        game.save()
    


# pre_save.connect(updateUser, sender=User )
# pre_save.connect(createPlayer, sender=Player )
post_save.connect(createGame, sender=Table )
