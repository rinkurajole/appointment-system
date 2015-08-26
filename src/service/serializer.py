"""
defining Service Serializer
"""
from rest_framework import serializers
from service.models import Service


class ServiceSerializer(serializers.ModelSerializer):
    """
    Serializer defining Service API Representation
    """
    class Meta:
        model = Service
        fields = ('id','location', 'name')
