# Generated by Django 4.1.2 on 2023-01-29 14:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0031_alter_game_ground'),
    ]

    operations = [
        migrations.RenameField(
            model_name='game',
            old_name='createdAt',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='game',
            old_name='dealer',
            new_name='small_blind',
        ),
        migrations.RenameField(
            model_name='player',
            old_name='joinedAt',
            new_name='joined_at',
        ),
        migrations.RenameField(
            model_name='player',
            old_name='leftAt',
            new_name='left_at',
        ),
    ]