
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
    permission_classes = (AllowAny,)
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()


class AuthUserViewSet(APIView):

    """
    AuthUserViewSet
    """
    permission_classes = (AllowAny,)
    # queryset = User.objects.all()
    serializer_class = UserSerializer

    @detail_route(methods=['delete'], url_path='id')
    def delete(self, request):
        """
        this model delete will log the user out
        """
        # user = self.get_object(request.user)
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request):
        """
        this model will log the authenticated user in
        """
        email = request.POST['email']
        password = request.POST['password']
        account = authenticate(email=email, password=password)
        if account is not None:
            if account.is_active:
                login(request, account)
                return Response(None)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class MeViewSet(APIView):
    """
    this model will show thw details of user logged in "
    """
    # queryset = requ()
    serializer_class = UserSerializer
    def get(self, request):
        """
        this method will return logged in user details
        """
        user = request.user
        if user.is_authenticated():
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response({
            'status': 'User not found',
            'message': 'Please log in first'
        }, status=status.HTTP_204_NO_CONTENT)
    
class LoginView(views.APIView):
    print("Inside login view !!!!!!!!!!!!!!!!!!!!")
    def post(self, request, format=None):
        print("request recieved",request.data)
        #  data = json.loads(request.body)
        # print(data, "data")
        email = request.data['email']
        password = request.data['password']
        print(email, ":::", password)
        account = authenticate(email=email, password=password)
        print("account", account)
        if account is not None:
            if account.is_active:
                login(request, account)
                print("user logged in   !!!!!!!!!!!!!!")
                serialized = UserDetailSerializer(account)
                print("Serialized data ", serialized.data)
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
        
