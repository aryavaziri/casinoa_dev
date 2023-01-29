# Generated by Django 4.1.2 on 2023-01-28 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0026_player_leftat_alter_player_joinedat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='balance',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='bet',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='joinedAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='player',
            name='leftAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]