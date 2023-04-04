from rest_framework import serializers
from .models import CompanyProfile,ConnecttoCompany,Companyapplication
from app.serializers import userProfileSerializer




class CompanySerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    Marked_Connections= userProfileSerializer(read_only=True, many=True)
    class Meta:
        model = CompanyProfile
        fields= '__all__'

class CompanyapplicationSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=Companyapplication
        fields= '__all__'

class ConnecttoCompanySerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model = ConnecttoCompany
        fields= '__all__'

