"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
1. Add an import:  from my_app import views
2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
1. Add an import:  from other_app.views import Home
2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
1. Add an import:  from blog import urls as blog_urls
2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from user.views import AuthUserViewSet
from user.views import MeViewSet
from user.views import UserDetailViewSet
from rest_framework import routers
from timeslot.views import TimeSlotViewSet
from service.views import ServiceViewSet
from organisation.views import OrganisationViewSet
from organisation.views import OrganisationLocationViewSet
from organisation.views import LocationContactViewSet
from appointment.views import UserAppointmentViewSet
from user import views

router = routers.DefaultRouter()
router.register(r'user', views.UserDetailViewSet)
router.register(r'organisation', OrganisationViewSet)
router.register(r'organisationlocation', OrganisationLocationViewSet)
router.register(r'organisationcontact', LocationContactViewSet)
router.register(r'service', ServiceViewSet)
router.register(r'timeslot', TimeSlotViewSet)
router.register(r'appointment', UserAppointmentViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^user/auth/$', AuthUserViewSet.as_view()),
    url(r'^user/me/(?P<email>[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$', MeViewSet.as_view(),name="get"),
    url(r'^user/appointment/$', UserAppointmentViewSet.as_view(), name="get"),
    url(r'^user/appointment/(?P<a_id>[0-9]+)$', UserAppointmentViewSet.as_view(),name="delete"),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^', include(router.urls)),
]
