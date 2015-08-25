"""
This view module is used to specify the User Details
"""

from user.models import User
from user.serializers import UserSerializer
from user.serializers import UserDetailSerializer
from rest_framework import viewsets
from django.contrib.auth.views import logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import detail_route
from django.contrib.auth import authenticate, login
from rest_framework.permissions import AllowAny
import json
from rest_framework import status, views
from django.views.decorators.csrf import csrf_exempt


class UserDetailViewSet(viewsets.ModelViewSet):
    # pylint: disable = too-many-ancestors
    """
    A viewset for viewing and editing user instances.
    """
    print("this is user detail top most")
    permission_classes = (AllowAny,)
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()   

        
class AuthUserViewSet(APIView):

    """
    AuthUserViewSet
    """    
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @detail_route(methods=['delete'], url_path='id')
    def delete(self, request):
        """
        this model delete will log the user out
        """
        # user = self.get_object(request.user)
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
    print("in auth user model????????")

    def post(self, request):
        """
        this model will log the authenticated user in
        """
        print("in auth user...post method")
        email = request.data['email']
        password = request.data['password']
        account = authenticate(email=email, password=password)
        print(account)
        if account is not None:
            if account.is_active:
                login(request, account)
                serialized = UserDetailSerializer(account)
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'User Not active'
                },status=status.HTTP_401_NO_CONTENT)
             
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'User not Authenticated'
            },status=status.HTTP_401_NO_CONTENT)
            

class MeViewSet(APIView):
    """
    this model will show thw details of user logged in "
    """
    serializer_class = UserDetailSerializer
    def get(self, request, email):
        """
        this method will return logged in user details
        """
        account = User.objects.get(email=email)
        serializer = UserDetailSerializer(account)
        return Response(serializer.data)
           
