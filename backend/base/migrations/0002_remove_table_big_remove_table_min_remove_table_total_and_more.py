# Generated by Django 4.1.2 on 2023-01-26 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='table',
            name='big',
        ),
        migrations.RemoveField(
            model_name='table',
            name='min',
        ),
        migrations.RemoveField(
            model_name='table',
            name='total',
        ),
        migrations.RemoveField(
            model_name='table',
            name='waiting',
        ),
        migrations.AddField(
            model_name='game',
            name='dealer',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='game',
            name='stage',
            field=models.IntegerField(choices=[(0, 'Preflap'), (1, 'Flap'), (2, 'Turn'), (3, 'River')], default=0, null=True),
        ),
        migrations.AddField(
            model_name='game',
            name='turn',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='table',
            name='max',
            field=models.IntegerField(choices=[(0, '3'), (1, '6'), (2, '9')], default=1, null=True),
        ),
        migrations.AlterField(
            model_name='table',
            name='type',
            field=models.IntegerField(choices=[(0, 'Homldem'), (1, 'Omaha')], default=0, null=True),
        ),
    ]