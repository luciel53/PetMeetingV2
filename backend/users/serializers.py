from rest_framework import serializers;
from .models import Profile
from django.contrib.auth.models import User

# convert all the profile model in json
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def get_username(self, obj):
        return obj.user.username

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
