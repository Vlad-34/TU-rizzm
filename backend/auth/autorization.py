from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            return None

        token = self.get_raw_token(header)
        if token is None:
            return None

        try:
            validated_token = self.get_validated_token(token)
        except exceptions.AuthenticationFailed as e:
            raise exceptions.AuthenticationFailed('Invalid token')

        user = self.get_user(validated_token)
        if user is None:
            raise exceptions.AuthenticationFailed('User not found')

        return user, validated_token

    def get_header(self, request):
        header = request.headers.get('Authorization')
        if header is None or not header.startswith('Bearer '):
            return None
        return header

    def get_raw_token(self, header):
        try:
            return header.split()[1]
        except IndexError:
            return None
