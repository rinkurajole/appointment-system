""" This module is used to include the urls with
respect to their functionality """

from django.conf.urls import url, include
from user import views
from rest_framework import routers
print("Hello..............")
router = routers.DefaultRouter()  # pylint: disable=C0103
router.register(r'user', views.UserDetailViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
