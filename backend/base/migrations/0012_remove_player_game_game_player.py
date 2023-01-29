# Generated by Django 4.1.2 on 2023-01-27 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_rename_id_game_round'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='game',
        ),
        migrations.AddField(
            model_name='game',
            name='player',
            field=models.ManyToManyField(blank=True, null=True, to='base.player'),
        ),
    ]