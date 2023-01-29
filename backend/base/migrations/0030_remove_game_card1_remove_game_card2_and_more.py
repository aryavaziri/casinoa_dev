# Generated by Django 4.1.2 on 2023-01-29 02:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0029_alter_player_leftat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='card1',
        ),
        migrations.RemoveField(
            model_name='game',
            name='card2',
        ),
        migrations.RemoveField(
            model_name='game',
            name='card3',
        ),
        migrations.RemoveField(
            model_name='game',
            name='card4',
        ),
        migrations.RemoveField(
            model_name='game',
            name='card5',
        ),
        migrations.AddField(
            model_name='game',
            name='ground',
            field=models.JSONField(default={'ground': [0, 0, 0, 0, 0]}),
        ),
    ]