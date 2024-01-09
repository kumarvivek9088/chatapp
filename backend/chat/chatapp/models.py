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
    
class chatsMenu(models.Model):
    user1 = models.ForeignKey(myUser, on_delete=models.CASCADE)
    user2 = models.ForeignKey(myUser,on_delete=models.CASCADE,related_name="chatswith")
    
class ChatHistory(models.Model):
    users = models.ForeignKey(chatsMenu,on_delete = models.CASCADE)
    sender = models.ForeignKey(myUser, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(myUser, on_delete=models.CASCADE, related_name='received_messages')
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    

class chatrequest(models.Model):
    sender = models.ForeignKey(myUser,on_delete=models.CASCADE,related_name="request_sender")
    receiver = models.ForeignKey(myUser,on_delete=models.CASCADE,related_name="request_receiver")
    message = models.TextField(null=True,blank=True)
    sent_at = models.DateTimeField(auto_now_add = True)
