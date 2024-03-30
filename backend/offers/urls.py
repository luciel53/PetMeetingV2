from django.urls import path
from .views import catOffer_view

urlpatterns = [
    path('offers/', catOffer_view, name='catOffer_view'),
]
