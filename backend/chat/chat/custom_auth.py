from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken

User = get_user_model()

class CustomAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        # Retrieve the user's credentials from the scope (e.g., headers, query params)
        # and perform your custom authentication logic here.
        # If the authentication is successful, set the user as a scope variable.
        # Otherwise, set it as an AnonymousUser.
        user = await self.get_user(scope)
        scope['user'] = user

        return await super().__call__(scope, receive, send)

    # @database_sync_to_async
    # def get_user(self, scope):
    #     # Implement your custom logic to retrieve the user based on the scope data.
    #     # For example, you can extract the authorization token from the headers
    #     # and perform a database query to fetch the corresponding user.
    #     # Return the user instance or AnonymousUser() if not authenticated.
    #     # Example implementation:
    #     token = scope['headers'].get(b'authorization', b'').decode('utf-8')
    #     if token:
    #         try:
    #             user = User.objects.get(auth_token=token)
    #             return user
    #         except User.DoesNotExist:
    #             pass
    #     return AnonymousUser()
    @database_sync_to_async
    def get_user(self, scope):
        query_string = str(scope['query_string'].decode('utf-8')).split('=')
        token = query_string[1]
        # print(token)
        # room_name = scope['path'].split('/')[-2]
        # print(room_name)
        if token:
            try:
                access_token = AccessToken(token)
                user = User.objects.get(id = access_token['user_id'])
                return user
            except User.DoesNotExist:
                pass
        return AnonymousUser()
