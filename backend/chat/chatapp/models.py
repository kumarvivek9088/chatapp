from django.db import models
from user.models import myUser
# Create your models here.
class chatchannel(models.Model):
    users = models.ManyToManyField(myUser)
    name = models.CharField(max_length=500)
    description = models.TextField()
    picture = models.ImageField(upload_to="profile/")
    media = models.FileField(upload_to='files/')
    datetime = models.DateTimeField(auto_now_add=True)
    
    