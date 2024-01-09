from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser,PermissionsMixin
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
# Create your models here.


class myUserManager(BaseUserManager):
    def create_user(self,username,email,password,**extrafields):
        if not username:
            raise ValueError("username isn't provided")
        if not email:
            raise ValueError("Email isn't provided")
        user = self.model(username=username,email=email,**extrafields)
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self,username,email,password,**extrafields):
        user = self.create_user(username=username,email=email,password=password,**extrafields)
        user.is_staff = True
        user.is_superuser  = True
        user.save()
        return user

class myUser(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=255,unique=True)
    email = models.EmailField(null=False)
    phonenumber = models.PositiveIntegerField(null=True,blank=True)
    firstname = models.CharField(max_length=255,null=True,blank = True)
    lastname = models.CharField(max_length=255,null=True,blank = True)
    profilepic = models.ImageField(upload_to="profile/" , null=True, blank= True)
    is_staff = models.BooleanField(
        default= False
    )
    is_active = models.BooleanField(
        default= True
    )
    is_superuser = models.BooleanField(
        default= False
    )
    
    objects = myUserManager()
    
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    
    def save(self,*args,**kwargs):
        super(myUser,self).save(*args,**kwargs)
    
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey,GenericRelation

class Notifications(models.Model):
    user = models.ForeignKey(myUser,on_delete=models.CASCADE)
    message = models.CharField(max_length = 500)
    datetime = models.DateTimeField(auto_now_add=True)
    is_read  = models.BooleanField(default = False)
    relatetype = models.ForeignKey(ContentType,on_delete=models.CASCADE)
    relate_id = models.PositiveIntegerField()
    relatedto = GenericForeignKey('relatetype','relate_id')
    