from django.urls import path

from .views import *
urlpatterns = [
   path('chats/',chatMenu.as_view()),
   path('chathistory/<int:id>',chatshistory.as_view()),
   path('chatrequests/',chatRequestApi.as_view()),
   path('chatrequests/accept/<int:id>/',chatRequestApi.as_view()),
   path('chatinfo/<int:id>',chatInformation.as_view()),
]