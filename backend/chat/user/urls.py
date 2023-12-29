from django.urls import path

from .views import *
urlpatterns = [
    path('createuser/',signup.as_view()),
    path('login/',Signin.as_view()),
    path('editprofile/',edituserDetails.as_view()),
    path('editprofile/<int:id>/',edituserDetails.as_view()),
    path('searchuser/',searchUser.as_view()),
]