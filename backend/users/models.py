from django.db import models
from django.contrib.auth import get_user_model

# feature that allows to recover dynamically the user model used in Django
User = get_user_model()

# Profile model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(default=None, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(default='defaultUser.jpg', upload_to='profile.pics', blank=True)
    birthdate = models.DateField(default=None, blank=True, null=True)
    external_link = models.URLField(default=None, blank=True, null=True)
    facebook_link = models.URLField(default=None, blank=True, null=True)


    def __str__(self):
        return self.user.username
