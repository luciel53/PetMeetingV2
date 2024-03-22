from django.urls import path
from . import views
from .views import main

urlpatterns = [
    path('home', main),
    path('', main)
]
