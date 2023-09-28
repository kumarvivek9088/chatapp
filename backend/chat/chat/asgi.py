"""
ASGI config for Eternity project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from .custom_auth import CustomAuthMiddleware
from chatapp.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Eternity.settings')

# application = get_asgi_application()
application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket":AllowedHostsOriginValidator(
            CustomAuthMiddleware(
                URLRouter(
                    websocket_urlpatterns
                )
            )
        )
    }
)
