from rest_framework import generics
from rest_framework.decorators import api_view
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User


class ProfileListAPIView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.select_related('user')  # Assurez-vous de sélectionner l'utilisateur associé pour éviter les requêtes supplémentaires
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # add the username to each profile
        for profile_data in data:
            user_id = profile_data['user']  # obtain the user id
            user = User.objects.get(pk=user_id) # obtain the object user complete
            profile_data['username'] = user.username
            print(user_id)
        return Response(data)

class ProfileDetailAPIView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
