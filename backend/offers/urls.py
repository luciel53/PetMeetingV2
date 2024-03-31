from django.urls import path
from .views import catOffer_view, get_form_data

urlpatterns = [
    path('offers/', catOffer_view, name='catOffer_view'),
    path('offers/get_form_data/', get_form_data, name="get_form_data"),
]
