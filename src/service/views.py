"""
defining Service ViewSet
"""

from rest_framework import viewsets
from service.models import Service
from service.serializer import ServiceSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import detail_route
from timeslot.models import TimeSlot
from timeslot.serializers import TimeSlotSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    """
    ViewSet defining Service View behavior
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    @detail_route(url_path = 'timeslot')
    def timeslot(self, request, pk):
        timeslot = TimeSlot.objects.filter(service = pk)
        serializer = TimeSlotSerializer(timeslot, many = True)
        return Response(serializer.data)
