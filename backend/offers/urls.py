from django.urls import path
from .views import catOffer_view, get_form_data, get_all_offers

urlpatterns = [
    path('offers/', catOffer_view, name='catOffer_view'),
    path('offers/get_form_data/', get_form_data, name="get_form_data"),
    path('offers/get_all_offers/', get_all_offers, name='get_all_offers'),
]
