"""
ViewSet for Organisation,OrganisationLocation and LocationContact.
"""

from rest_framework import viewsets
from organisation.serializers import OrganisationSerializer
from organisation.serializers import OrganisationLocationSerializer
from organisation.serializers import LocationContactSerializer
from organisation.models import Organisation, OrganisationLocation
from organisation.models import LocationContact
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from service.models import Service
from service.serializer import ServiceSerializer
# pylint: disable=too-many-ancestors


class OrganisationViewSet(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    """
    View for organisation.
    """
    print("Inside Organisation Viewset")
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer

    @detail_route(methods = ['get'],url_path = 'locations')
    def locations(self, request, pk):
        print("Inside Organisation Viewset get method")
        locations = OrganisationLocation.objects.filter(organisation = pk)
        serializer = OrganisationLocationSerializer(locations, many = True)
        return Response(serializer.data)


class OrganisationLocationViewSet(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    """
    Viewset for organisation Location.
    """
    queryset = OrganisationLocation.objects.all()
    serializer_class = OrganisationLocationSerializer

    @detail_route(methods = ['get'],url_path = 'services')
    def services(self, request, pk):
        print("Inside Organisation Viewset get method")
        services = Service.objects.filter(location = pk)
        serializer = ServiceSerializer(services, many = True)
        return Response(serializer.data)

    @detail_route(methods = ['get'],url_path = 'contacts')
    def contacts(self, request, pk):
        print("Inside Organisation Viewset get method")
        contacts = LocationContact.objects.filter(location = pk)
        serializer = LocationContactSerializer(contacts, many = True)
        return Response(serializer.data)


class LocationContactViewSet(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    """
    Viewset for organisation location contact's.
    """
    queryset = LocationContact.objects.all()
    serializer_class = LocationContactSerializer
