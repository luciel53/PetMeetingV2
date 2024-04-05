from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# login class
class HomeView(APIView):

   permission_classes = (IsAuthenticated, )
   def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)

# logout class
class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)

     def post(self, request):

          try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)

# register class
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # check if the user already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Ce nom d'utilisateur est déjà pris"}, status=status.HTTP_400_BAD_REQUEST)

        # check if email already exists
        elif User.objects.filter(email=email).exists():
            return Response({"error": "Cet email est déjà enregistré"})

        # create a new user
        user = User.objects.create(username=username,email=email, password=make_password(password))
        print (User)
        print("ID de l'utilisateur créé :", user.id)
        print (make_password(password))
        user.save()

        return Response({"success": "Utilisateur créé avec succès"}, status=status.HTTP_201_CREATED)
