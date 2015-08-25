from rest_framework import serializers
from appointment.models import Appointment

class UserAppointmentSerializer(serializers.ModelSerializer):
    """
    Serializer for Appointment Model
    """
    class Meta:
        model = Appointment
        fields = ('id',
                  'service', 'user','time_slot','date')

