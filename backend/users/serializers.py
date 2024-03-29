from rest_framework import serializers;
from .models import Profile

# convert all the profile model in json
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

