# Generated by Django 4.2.11 on 2024-03-24 18:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contact',
            old_name='object',
            new_name='topic',
        ),
    ]
