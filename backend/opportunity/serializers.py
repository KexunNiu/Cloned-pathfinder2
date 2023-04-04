from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import *
from company.serializers import CompanySerializer
from app.serializers import userProfileSerializer

class OpportunitySerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    class Meta:
        model = Opportunity
        fields = '__all__'

class OpportunityApplicationSerializer(serializers.ModelSerializer):
    opportunity = OpportunitySerializer(read_only=True)
    applicant = userProfileSerializer(read_only=True)
    class Meta:
        model = OpportunityApplication
        fields = '__all__'
    
    def create(self, validated_data):
        validated_data['opportunity'] = self.context.get('opportunity')
        validated_data['applicant'] = self.context.get('applicant')
        return super().create(validated_data)

#create tags for opportunity, one opportunity can have many tags

class OpportunityTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportunityTags
        fields = '__all__'

    def create(self, validated_data):
        validated_data['opportunity'] = self.context.get('opportunity')
        return super().create(validated_data)