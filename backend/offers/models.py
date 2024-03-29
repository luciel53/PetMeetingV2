from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator


SEX_CHOICES = [
    ("M", "Male"),
    ("F", "Female")
]

LOCATION_CHOICES = [
    ( "Ain", "Ain" ),
    ( "Aisne", "Aisne" ),
    ( "Allier", "Allier" ),
    ( "Alpes-de-Haute-Provence", "Alpes-de-Haute-Provence" ),
    ( "Hautes-Alpes", "Hautes-Alpes" ),
    ( "Alpes-Maritimes", "Alpes-Maritimes" ),
    ( "Ardèche", "Ardèche" ),
    ( "Ardennes", "Ardennes" ),
    ( "Ariège", "Ariège" ),
    ( "Aube", "Aube" ),
    ( "Aude", "Aude" ),
    ( "Aveyron", "Aveyron" ),
    ( "Bouches-du-Rhône", "Bouches-du-Rhône" ),
    ( "Calvados", "Calvados" ),
    ( "Cantal", "Cantal" ),
    ( "Charente", "Charente" ),
    ( "Charente-Maritime", "Charente-Maritime" ),
    ( "Cher", "Cher" ),
    ( "Corrèze", "Corrèze" ),
    ( "Corse-du-Sud", "Corse-du-Sud" ),
    ( "Haute-Corse", "Haute-Corse" ),
    ( "Côte-d'Or", "Côte-d'Or" ),
    ( "Côtes-d'Armor", "Côtes-d'Armor" ),
    ( "Creuse", "Creuse" ),
    ( "Dordogne", "Dordogne" ),
    ( "Doubs", "Doubs" ),
    ( "Drôme", "Drôme" ),
    ( "Eure", "Eure" ),
    ( "Eure-et-Loir", "Eure-et-Loir" ),
    ( 'Essonne', 'Essonne' ),
    ( "Finistère", "Finistère" ),
    ( "Gard", "Gard" ),
    ( "Haute-Garonne", "Haute-Garonne" ),
    ( "Gers", "Gers" ),
    ( "Gironde", "Gironde" ),
    ( 'Guadeloupe', 'Guadeloupe' ),
    ( 'Guyane', 'Guyane' ),
    ( 'Hauts-de-Seine', 'Hauts-de-Seine' ),
    ( "Hérault", "Hérault" ),
    ( "Ille-et-Vilaine", "Ille-et-Vilaine" ),
    ( "Indre", "Indre" ),
    ( "Indre-et-Loire", "Indre-et-Loire" ),
    ( "Isère", "Isère" ),
    ( "Jura", "Jura" ),
    ( "Landes", "Landes" ),
    ( "Loir-et-Cher", "Loir-et-Cher" ),
    ( "Loire", "Loire" ),
    ( "Haute-Loire", "Haute-Loire" ),
    ( "Loire-Atlantique", "Loire-Atlantique" ),
    ( "Loiret", "Loiret" ),
    ( "Lot", "Lot" ),
    ( "Lot-et-Garonne", "Lot-et-Garonne" ),
    ( "Lozère", "Lozère" ),
    ( "Maine-et-Loire", "Maine-et-Loire" ),
    ( "Manche", "Manche" ),
    ( "Marne", "Marne" ),
    ( "Haute-Marne", "Haute-Marne" ),
    ( 'Martinique', 'Martinique' ),
    ( "Mayenne", "Mayenne" ),
    ( 'Mayotte', 'Mayotte' ),
    ( "Meurthe-et-Moselle", "Meurthe-et-Moselle" ),
    ( "Meuse", "Meuse" ),
    ( "Morbihan", "Morbihan" ),
    ( "Moselle", "Moselle" ),
    ( "Nièvre", "Nièvre" ),
    ( "Nord", "Nord" ),
    ( "Oise", "Oise" ),
    ( "Orne", "Orne" ),
    ( "Pas-de-Calais", "Pas-de-Calais" ),
    ( 'Polynésie française', 'Polynésie française' ),
    ( "Puy-de-Dôme", "Puy-de-Dôme" ),
    ( "Pyrénées-Atlantiques", "Pyrénées-Atlantiques" ),
    ( "Hautes-Pyrénées", "Hautes-Pyrénées" ),
    ( "Pyrénées-Orientales", "Pyrénées-Orientales" ),
    ( 'La Réunion', 'La Réunion' ),
    ( "Bas-Rhin", "Bas-Rhin" ),
    ( 'Haute-Vienne', 'Haute-Vienne' ),
    ( "Haut-Rhin", "Haut-Rhin" ),
    ( "Rhône", "Rhône" ),
    ( 'Saint-Barthélemy', 'Saint-Barthélemy' ),
    ( 'Saint-Martin', 'Saint-Martin' ),
    ( 'Saint-Pierre-et-Miquelon', 'Saint-Pierre-et-Miquelon' ),
    ( "Haute-Saône", "Haute-Saône" ),
    ( "Saône-et-Loire", "Saône-et-Loire" ),
    ( "Sarthe", "Sarthe" ),
    ( "Savoie", "Savoie" ),
    ( "Haute-Savoie", "Haute-Savoie" ),
    ( "Paris", "Paris" ),
    ( "Seine-Maritime", "Seine-Maritime" ),
    ( "Seine-et-Marne", "Seine-et-Marne" ),
    ( 'Seine-Saint-Denis', 'Seine-Saint-Denis' ),
    ( "Yvelines", "Yvelines" ),
    ( "Deux-Sèvres", "Deux-Sèvres" ),
    ( "Somme", "Somme" ),
    ( "Tarn", "Tarn" ),
    ( 'Tarn-et-Garonne', 'Tarn-et-Garonne' ),
    ( 'Territoire de Belfort', 'Territoire de Belfort' ),
    ( 'Val-de-Marne', 'Val-de-Marne' ),
    ( 'Val-d\'Oise', 'Val-d\'Oise' ),
    ( 'Var', 'Var' ),
    ( 'Vaucluse', 'Vaucluse' ),
    ( 'Vendée', 'Vendée' ),
    ( 'Vienne', 'Vienne' ),
    ( 'Vosges', 'Vosges' ),
    ( 'Wallis et Futuna', 'Wallis et Futuna' ),
    ( 'Yonne', 'Yonne' ),
]

BLOOD_CHOICES = [
    ('A', 'A'),
    ('B', 'B'),
    ('AB', 'AB')
]

EYECOLOR_CHOICES = [
    ('blue', 'bleu'),
    ('green', 'verts'),
    ('gold', 'Or'),
    ('vairons', 'vairons'),
    ('', '')

]

class PostOffer(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class CatOffer(models.Model):
    name = models.CharField(max_length=100)
    date_posted = models.DateTimeField(auto_now_add=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    sex = models.CharField(choices=SEX_CHOICES, max_length=20)
    location = models.CharField(choices=LOCATION_CHOICES, max_length=100)
    blood = models.CharField(choices=BLOOD_CHOICES, blank=True, max_length=10)
    diseases_tests = models.CharField(max_length=200)
    id_num = models.CharField(max_length=30, unique=True, validators=[MinLengthValidator(20)])
    eye_color = models.CharField(max_length=100, choices=EYECOLOR_CHOICES, default=None, blank=True)
    fur_color = models.CharField(max_length=100, default=None, blank=True)
    age = models.IntegerField()
    qualities = models.TextField(max_length=350, default=None, blank=True, null=True)
    flaws = models.TextField(max_length=350, default=None, blank=True, null=True)
    free_descriptive_text = models.TextField(max_length=2000,default=None, blank=True)

    def __str__(self):
        return self.name
