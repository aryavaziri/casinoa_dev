# Generated by Django 4.1.2 on 2023-01-27 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_remove_table_online'),
    ]

    operations = [
        migrations.AlterField(
            model_name='table',
            name='type',
            field=models.IntegerField(choices=[(0, 'Holdem-Texas'), (1, 'Omaha')], default=0, null=True),
        ),
    ]
