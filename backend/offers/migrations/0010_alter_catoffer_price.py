# Generated by Django 4.2.11 on 2024-04-09 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0009_rename_owner_catoffer_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catoffer',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7),
        ),
    ]