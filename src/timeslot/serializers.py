'''
This is Serializaer
'''

from rest_framework import serializers
from timeslot.models import TimeSlot
# from django.contrib.auth.models import User, Group


class TimeSlotSerializer(serializers.ModelSerializer):
    """
    Serializer For TimeSlot MOdel
    """
    class Meta:
        model = TimeSlot
        fields = ('service', 'id', 'start_time',
                  'end_time', 'capacity', 'active')
