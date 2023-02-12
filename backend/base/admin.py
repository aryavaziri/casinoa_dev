from django.contrib import admin
from .models import Table, Game, Player, User
# Register your models here.

# class PlayerAdmin(admin.ModelAdmin):
#     fields=[
#         'user',
#         'turn',
#     ]

admin.site.register(User)
admin.site.register(Table)
admin.site.register(Game)
# admin.site.register(Player, PlayerAdmin)
admin.site.register(Player)
