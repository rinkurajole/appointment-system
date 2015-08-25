from appointment.models import Appointment
from appointment.serializers import UserAppointmentSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from django.contrib.auth import authenticate, login
from rest_framework.permissions import AllowAny
import json
from rest_framework import status, views
from django.views.decorators.csrf import csrf_exempt
from organisation.serializers import OrganisationLocationSerializer
from datetime import datetime
from django.http import QueryDict
class UserAppointmentViewSet(APIView):
    """
    this model will show thw details of user appointments in "
    """
    print("dasdsadsad")
    serializer_class = UserAppointmentSerializer
    queryset=Appointment.objects.all()
    def get(self, request):
        """
        this method will return logged in user details
        """
        data = []
        user_id=request.GET['data']
        try:
            user_appointment = Appointment.objects.select_related('user').filter(user_id=user_id);
            i = 0;
            for appointment in user_appointment:
                location=OrganisationLocationSerializer(appointment.service.location)
                data.append({'id':appointment.id, 'service' : appointment.service.name, 'branch':location.data, 'date': appointment.date, 'timeslot': "%s - %s" % (appointment.time_slot.start_time.strftime("%I:%M"),appointment.time_slot.end_time.strftime("%I:%M"))})
                print("Date :", appointment.date)
        except Appointment.DoesNotExist:
            user_appointment= 0
        return Response(data)
    def delete(self, request, a_id):
        """
        this method will delete the entry from appointment table according
        to appointment id passed as parameter
        """
        print("appointment id"+a_id)
        appointment=Appointment.objects.get(id=a_id);
        if(appointment.delete()!=True):
            return Response({
                'message': "Deleted successfully",
                'id': a_id,
            })
        return Response({
            'message': "Deletion failed",
            'id': a_id,
        })
        
    
