from django.urls import path

from .views import *
urlpatterns = [
    path('createuser/',signup.as_view()),
    path('login/',Signin.as_view()),
]