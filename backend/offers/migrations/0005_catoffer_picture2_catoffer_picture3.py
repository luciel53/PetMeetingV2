# Generated by Django 4.2.11 on 2024-04-02 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0004_alter_catoffer_sex'),
    ]

    operations = [
        migrations.AddField(
            model_name='catoffer',
            name='picture2',
            field=models.ImageField(blank=True, null=True, upload_to='cat_offer_pictures/'),
        ),
        migrations.AddField(
            model_name='catoffer',
            name='picture3',
            field=models.ImageField(blank=True, null=True, upload_to='cat_offer_pictures/'),
        ),
    ]
