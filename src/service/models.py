"""
Defining Service Model
"""

from django.db import models
from organisation.models import OrganisationLocation


class Service(models.Model):
    """
    This class will hold the detail
    of different services provided by the organisation.
    """
    location = models.ForeignKey(OrganisationLocation)
    name = models.CharField(max_length=30)
    
    class Meta:
        unique_together = ("location", "name")
        
    def __str__(self):
        return ("%s - %s" % (self.location.name, self.name))

