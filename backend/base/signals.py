from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

# def leaveGame(sender, instance, **kwargs):
#     player = instance
#     if(player.balance>0):
#         player.credit_total += player.balance
#         player.balance = 0


pre_save.connect(updateUser, sender=User )
