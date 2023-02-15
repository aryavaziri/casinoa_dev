from django.db.models.signals import pre_save, post_save, class_prepared
from django.contrib.auth.models import User
from .models import Table, Game, Player
from .serializers import GameSerializer
maxs = [
        3,
        6,
        9,
    ]


def balancer(sender, instance, **kwargs):
    player = instance
    print(player.balance)
    # player = Player.objects.get(user=player.user)
    # if (player.balance > 0):
    #     player.credit_total += player.balance
    #     player.balance = 0
    #     player.save()
    # len(serializer.data['player'])


# def preparation(sender, instance, **kwargs):
#     table = instance

#     try:
#         serializer = GameSerializer(Game.objects.filter(
#             table=instance).last(), many=False)
#         table.online = (len(serializer.data['player']))
#         try:
#             if (serializer.data['online'] < maxs[table.max]):
#                 table.isAvailable = True
#             else:
#                 table.isAvailable = False
#         except KeyError:
#             table.isAvailable = True
#     except:
#         table.online = 0
#         table.isAvailable = False

# def preparation2(sender, instance, **kwargs):
#     game = instance
#     try:
#         serializer = GameSerializer(game)
#         table = game.table
#         table.online = (len(serializer.data['player']))
#         try:
#             if (serializer.data['online'] < maxs[table.max]):
#                 table.isAvailable = True
#             else:
#                 table.isAvailable = False
#         except KeyError:
#             table.isAvailable = True
#     except:
#         table.online = 0
#         table.isAvailable = False
#     table.save()


def createGame(sender, instance, **kwargs):
    table = instance
    if(len(Game.objects.filter(table=table)) == 0):
        print("ROUND FROM SIGNAL------------------------------->>>>>>>>>>>>>>>>>>")
        game = Game.objects.create(table=table, round=0)
        # print(game.round)
    # game.save()


def onlineCheck(sender, instance, **kwargs):
    game = instance
    table = game.table
    table.online = game.player.count()
    table.save()


# pre_save.connect(preparation, sender=Table)
# pre_save.connect(preparation2, sender=Game)
post_save.connect(onlineCheck, sender=Game)
# post_save.connect(balancer, sender=Player)
# pre_save.connect(createGame, sender=Table)
