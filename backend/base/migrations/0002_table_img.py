# Generated by Django 4.1.2 on 2022-11-06 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='table',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
