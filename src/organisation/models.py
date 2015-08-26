"""Organisation model"""
from django.db import models
from django.core.validators import RegexValidator
import datetime


class Organisation(models.Model):
    """
    Model for storing information about organisation.
    """

    alphanumeric = RegexValidator(
        r'^[a-zA-Z]([a-zA-Z0-9]|[- @\.#&!])*$', message='Only standard names are allowed.')
    name = models.CharField(
        unique=True, max_length=50, validators=[alphanumeric], blank=False)
    date_of_registration = models.DateTimeField(
        default=datetime.datetime.now()
    )

    def __str__(self):
        return self.name


class OrganisationLocation(models.Model):
    """
    Model for storing information related to an Organisation
    location.
    """

    organisation = models.ForeignKey(Organisation)
    name = models.CharField(max_length=30)
    no_of_services = models.CharField(max_length=3)

    class Meta:
        unique_together = ("organisation", "name")

    def __str__(self):
        return self.organisation.name+"-"+self.name


class LocationContact(models.Model):
    """
    Model for storing information related to an Organisation
    location.
    """

    location = models.ForeignKey(OrganisationLocation)
    office_contact = models.CharField(validators=[RegexValidator(
        regex='\+?\d[\d -]{8,12}\d', message='Length has to be 14', code='nomatch')],
                                      max_length=14)
    office_email = models.EmailField(unique=True, max_length=30)
    personal_contact = models.CharField(validators=[RegexValidator(
        regex='^[0-9]{10}$', message='Length has to be 10',
        code='nomatch')], max_length=10)
    personal_email = models.EmailField(unique=True, max_length=30)
    address = models.CharField(max_length=50)
