""" Serialize data """

from rest_framework import serializers
from organisation.models import Organisation, OrganisationLocation
from organisation.models import LocationContact


class OrganisationSerializer(serializers.ModelSerializer):
    """
    Serializer for Organisation model.
    """
    class Meta:
        model = Organisation
        fields = ('id', 'name')


class OrganisationLocationSerializer(serializers.ModelSerializer):
    """
    Serializer for Organisation Location.
    """
    class Meta:
        model = OrganisationLocation
        fields = ('organisation', 'id', 'name', 'no_of_services')


class LocationContactSerializer(serializers.ModelSerializer):
    """
    Serializer for Organisation contact's.
    """
    class Meta:
        model = LocationContact
        fields = ('id','location', 'office_contact', 'office_email',
                  'personal_contact', 'personal_email', 'address')
