from django.contrib import admin
from .models import myUser,Notifications
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from django.utils.translation import gettext_lazy as _

# Register your models here.
@admin.register(myUser)
class UserAdmin(DefaultUserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        (
            _('Personal info'),
            {
                'fields': (
                    'firstname',
                    'lastname'
                )
            }
        ),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'groups',
                    'user_permissions',
                ),
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': ('username', 'phonenumber', 'email', 'password1', 'password2'),
            },
        ),
    )
    list_display = ['id', 'username', 'email',
                    'is_active', 'is_staff', 'is_superuser']
    list_display_links = ['id', 'username', 'email',
                          'is_active', 'is_staff', 'is_superuser']
    search_fields = ['phonenumber', 'username', 'email']
    # readonly_fields = ['last_login', 'date_joined']
    ordering = None



admin.site.register(Notifications)