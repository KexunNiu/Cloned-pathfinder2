from rest_framework import serializers
from .models import Mentor,ConnectWithMentee
from app.models import userProfile

# serializers for all the models of mentor

class MentorSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model = userProfile
        fields= '__all__'
    
class ConnectWithMenteeSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model = ConnectWithMentee
        fields= '__all__'