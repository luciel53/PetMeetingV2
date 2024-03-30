from django.contrib import admin
from .models import CatOffer, CatOfferAdmin

admin.site.register(CatOffer, CatOfferAdmin)
# Register your models here.
