# Generated by Django 4.2.11 on 2024-04-09 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0011_alter_catoffer_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catoffer',
            name='price',
            field=models.IntegerField(blank=True, default=None),
        ),
    ]
