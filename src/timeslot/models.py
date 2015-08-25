'''
This module is used for creating timeslots for organisations
everyday schedule.
'''

from django.db import models
from service.models import Service


class TimeSlot(models.Model):
    '''
    Define database field's to keep records about timeslots.
    '''
    #print(models.ForeignKey(Service))
    service = models.ForeignKey(Service)
    start_time = models.TimeField()
    end_time = models.TimeField()
    capacity = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
