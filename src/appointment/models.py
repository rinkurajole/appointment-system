"""
This model will be used for booking the appointment
and it includes the following fields- service, user,
location, time slot & date.
"""
from django.db import models
from service.models import Service
from django.conf import settings
from timeslot.models import TimeSlot
from django.conf import settings

class Appointment(models.Model):
    '''
    This class will hold the information about the appointment(s)
    '''

    # id is automatically generated for Appointment
    service = models.ForeignKey(Service)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    time_slot = models.ForeignKey(TimeSlot)
    date = models.DateField()
