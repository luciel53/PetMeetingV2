# Generated by Django 4.2.11 on 2024-04-01 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0003_catoffer_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catoffer',
            name='sex',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=20),
        ),
    ]
