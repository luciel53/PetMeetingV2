# Generated by Django 4.2.11 on 2024-04-18 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0012_alter_catoffer_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catoffer',
            name='eye_color',
            field=models.CharField(blank=True, choices=[('blue', 'Bleus'), ('green', 'Verts'), ('gold', 'Or'), ('vairons', 'Vairons')], default=None, max_length=100),
        ),
    ]