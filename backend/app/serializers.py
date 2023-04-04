
from rest_framework import serializers
from .models import userProfile,RegularUser,ConnectToMentor

from django.contrib.auth.models import User
from company.models import CompanyProfile

# serializers for all the models of app

class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields= ('id','name', 'description')

class RegularUserSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model = RegularUser
        fields= '__all__'

class MentorMenteeSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model = User
        fields=  ('user','id', 'username', 'email')

class userProfileSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    MentorsList = MentorMenteeSerializer(read_only=True, many=True)
    MenteeList = MentorMenteeSerializer(read_only=True, many=True)
    CompanyFollowerList= CompanyProfileSerializer(read_only=True, many=True)
    class Meta:
        model=userProfile
        fields='__all__'
    

class ConnectToMentorSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model = ConnectToMentor
        fields= '__all__'
