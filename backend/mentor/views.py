from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Mentor,ConnectWithMentee
from .serializers import MentorSerializer,ConnectWithMenteeSerializer
from rest_framework.views import APIView
from app.models import userProfile
from rest_framework.response import Response
# Create your views here.

class MentorListApiView(ListAPIView):
    """ Will give a list of all the User that are a Mentor or have Mentor Status"""
    queryset=Mentor.objects.all()
    serializer_class=MentorSerializer
    permission_classes=[IsAuthenticated]


class CreateConnectWithMenteeView(APIView):
    queryset = ConnectWithMentee.objects.all()
    serializer_class = ConnectWithMenteeSerializer
    #permission_classes=[IsAuthenticated]
    def get(self, request, *args, **kwargs): 
        sender = userProfile.objects.get(id=kwargs['pk1'])
        receiver = userProfile.objects.get(id=kwargs["pk2"])
        rel = ConnectWithMentee.objects.create(Mentor=sender, Mentee=receiver, status='pending')
        return Response({'status': 'Request sent'}, status=201)