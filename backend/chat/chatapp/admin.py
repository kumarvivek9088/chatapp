from django.contrib import admin
from .models import chatchannel,ChatHistory,chatsMenu,chatrequest

# Register your models here.
admin.site.register(chatchannel)
admin.site.register(ChatHistory)
admin.site.register(chatsMenu)
admin.site.register(chatrequest)