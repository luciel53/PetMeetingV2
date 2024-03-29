from django.db import models
from django.contrib.auth import get_user_model

# feature that allows to recover dynamically the user model used in Django
User = get_user_model()

# Profile model
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_user = models.IntegerField()
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    profileimg = models.ImageField(upload_to='profile_images', default='defaultUser.jpg')

    def __str__(self):
        return self.user.username
