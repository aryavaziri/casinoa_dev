# Generated by Django 4.1.2 on 2023-01-26 19:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_remove_table_big_remove_table_min_remove_table_total_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='game',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.table'),
        ),
    ]
