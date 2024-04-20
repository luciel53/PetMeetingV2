from django.urls import path
from . import views

urlpatterns = [
    # Chat messages
    path("messaging/<user_id>/", views.Inbox.as_view(), )
]
