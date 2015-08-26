"""
Views For TimeSLot
"""

from rest_framework import viewsets
from timeslot.serializers import TimeSlotSerializer
from timeslot.models import TimeSlot
# from django.contrib.auth.models import User, Group


class TimeSlotViewSet(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    """
    API  that allows timeslot to be  viewed or edited.
    """
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
