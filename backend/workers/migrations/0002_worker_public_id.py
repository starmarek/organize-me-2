# Generated by Django 3.2 on 2021-04-18 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='worker',
            name='public_id',
            field=models.IntegerField(null=True),
        ),
    ]