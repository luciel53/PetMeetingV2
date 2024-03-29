from django.urls import path
from . import views
from .views import ProfileListAPIView
from .views import ProfileDetailAPIView

urlpatterns = [
    path('profiles/', ProfileListAPIView.as_view(), name='profile-list'),
    path('profiles/<int:pk>', ProfileDetailAPIView.as_view(), name='profile-detail'),
]
