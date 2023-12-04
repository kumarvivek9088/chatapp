from django.urls import path

from .views import *
urlpatterns = [
   path('chats/',chatMenu.as_view()),
   path('chathistory/<int:id>',chatshistory.as_view()),
]