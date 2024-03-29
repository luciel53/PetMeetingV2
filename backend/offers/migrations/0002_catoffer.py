# Generated by Django 4.2.11 on 2024-03-24 17:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CatOffer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('date_posted', models.DateTimeField(auto_now_add=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('sex', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=20)),
                ('location', models.CharField(choices=[('Ain', 'Ain'), ('Aisne', 'Aisne'), ('Allier', 'Allier'), ('Alpes-de-Haute-Provence', 'Alpes-de-Haute-Provence'), ('Hautes-Alpes', 'Hautes-Alpes'), ('Alpes-Maritimes', 'Alpes-Maritimes'), ('Ardèche', 'Ardèche'), ('Ardennes', 'Ardennes'), ('Ariège', 'Ariège'), ('Aube', 'Aube'), ('Aude', 'Aude'), ('Aveyron', 'Aveyron'), ('Bouches-du-Rhône', 'Bouches-du-Rhône'), ('Calvados', 'Calvados'), ('Cantal', 'Cantal'), ('Charente', 'Charente'), ('Charente-Maritime', 'Charente-Maritime'), ('Cher', 'Cher'), ('Corrèze', 'Corrèze'), ('Corse-du-Sud', 'Corse-du-Sud'), ('Haute-Corse', 'Haute-Corse'), ("Côte-d'Or", "Côte-d'Or"), ("Côtes-d'Armor", "Côtes-d'Armor"), ('Creuse', 'Creuse'), ('Dordogne', 'Dordogne'), ('Doubs', 'Doubs'), ('Drôme', 'Drôme'), ('Eure', 'Eure'), ('Eure-et-Loir', 'Eure-et-Loir'), ('Essonne', 'Essonne'), ('Finistère', 'Finistère'), ('Gard', 'Gard'), ('Haute-Garonne', 'Haute-Garonne'), ('Gers', 'Gers'), ('Gironde', 'Gironde'), ('Guadeloupe', 'Guadeloupe'), ('Guyane', 'Guyane'), ('Hauts-de-Seine', 'Hauts-de-Seine'), ('Hérault', 'Hérault'), ('Ille-et-Vilaine', 'Ille-et-Vilaine'), ('Indre', 'Indre'), ('Indre-et-Loire', 'Indre-et-Loire'), ('Isère', 'Isère'), ('Jura', 'Jura'), ('Landes', 'Landes'), ('Loir-et-Cher', 'Loir-et-Cher'), ('Loire', 'Loire'), ('Haute-Loire', 'Haute-Loire'), ('Loire-Atlantique', 'Loire-Atlantique'), ('Loiret', 'Loiret'), ('Lot', 'Lot'), ('Lot-et-Garonne', 'Lot-et-Garonne'), ('Lozère', 'Lozère'), ('Maine-et-Loire', 'Maine-et-Loire'), ('Manche', 'Manche'), ('Marne', 'Marne'), ('Haute-Marne', 'Haute-Marne'), ('Martinique', 'Martinique'), ('Mayenne', 'Mayenne'), ('Mayotte', 'Mayotte'), ('Meurthe-et-Moselle', 'Meurthe-et-Moselle'), ('Meuse', 'Meuse'), ('Morbihan', 'Morbihan'), ('Moselle', 'Moselle'), ('Nièvre', 'Nièvre'), ('Nord', 'Nord'), ('Oise', 'Oise'), ('Orne', 'Orne'), ('Pas-de-Calais', 'Pas-de-Calais'), ('Polynésie française', 'Polynésie française'), ('Puy-de-Dôme', 'Puy-de-Dôme'), ('Pyrénées-Atlantiques', 'Pyrénées-Atlantiques'), ('Hautes-Pyrénées', 'Hautes-Pyrénées'), ('Pyrénées-Orientales', 'Pyrénées-Orientales'), ('La Réunion', 'La Réunion'), ('Bas-Rhin', 'Bas-Rhin'), ('Haute-Vienne', 'Haute-Vienne'), ('Haut-Rhin', 'Haut-Rhin'), ('Rhône', 'Rhône'), ('Saint-Barthélemy', 'Saint-Barthélemy'), ('Saint-Martin', 'Saint-Martin'), ('Saint-Pierre-et-Miquelon', 'Saint-Pierre-et-Miquelon'), ('Haute-Saône', 'Haute-Saône'), ('Saône-et-Loire', 'Saône-et-Loire'), ('Sarthe', 'Sarthe'), ('Savoie', 'Savoie'), ('Haute-Savoie', 'Haute-Savoie'), ('Paris', 'Paris'), ('Seine-Maritime', 'Seine-Maritime'), ('Seine-et-Marne', 'Seine-et-Marne'), ('Seine-Saint-Denis', 'Seine-Saint-Denis'), ('Yvelines', 'Yvelines'), ('Deux-Sèvres', 'Deux-Sèvres'), ('Somme', 'Somme'), ('Tarn', 'Tarn'), ('Tarn-et-Garonne', 'Tarn-et-Garonne'), ('Territoire de Belfort', 'Territoire de Belfort'), ('Val-de-Marne', 'Val-de-Marne'), ("Val-d'Oise", "Val-d'Oise"), ('Var', 'Var'), ('Vaucluse', 'Vaucluse'), ('Vendée', 'Vendée'), ('Vienne', 'Vienne'), ('Vosges', 'Vosges'), ('Wallis et Futuna', 'Wallis et Futuna'), ('Yonne', 'Yonne')], max_length=100)),
                ('blood', models.CharField(blank=True, choices=[('A', 'A'), ('B', 'B'), ('AB', 'AB')], max_length=10)),
                ('diseases_tests', models.CharField(max_length=200)),
                ('id_num', models.CharField(max_length=30, unique=True, validators=[django.core.validators.MinLengthValidator(20)])),
                ('eye_color', models.CharField(blank=True, choices=[('blue', 'bleu'), ('green', 'verts'), ('gold', 'Or'), ('vairons', 'vairons'), ('', '')], default=None, max_length=100)),
                ('fur_color', models.CharField(blank=True, default=None, max_length=100)),
                ('age', models.IntegerField()),
                ('qualities', models.TextField(blank=True, default=None, max_length=350, null=True)),
                ('flaws', models.TextField(blank=True, default=None, max_length=350, null=True)),
                ('free_descriptive_text', models.TextField(blank=True, default=None, max_length=2000)),
            ],
        ),
    ]
