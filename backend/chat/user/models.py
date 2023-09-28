from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser,PermissionsMixin
# Create your models here.


class myUserManager(BaseUserManager):
    def create_user(self,username,email,password,**extrafields):
        if not username:
            raise ValueError("username isn't provided")
        if not email:
            raise ValueError("Email isn't provided")
        user = self.model(username=username,email=email,**extrafields)
        user.set_password(password)
        user.save()
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
    phonenumber = models.PositiveIntegerField(null=True)
    firstname = models.CharField(max_length=255,null=True)
    lastname = models.CharField(max_length=255,null=True)
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
    REQUIRED_FIELDS = ['email']
    
    
    def save(self,*args,**kwargs):
        super(myUser,self).save(*args,**kwargs)
    