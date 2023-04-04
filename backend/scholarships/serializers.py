from rest_framework import serializers
from .models import Scholarship, ScholarshipApplication, ScholarshipTags
from app.serializers import RegularUserSerializer
from company.serializers import CompanySerializer


# serializers for all the models of scholarship

class ScholarshipSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    class Meta:
        model = Scholarship
        fields = '__all__'

class ScholarshipApplicationSerializer(serializers.ModelSerializer):
    scholarship = ScholarshipSerializer(read_only=True)
    applicant = RegularUserSerializer(read_only=True)
    class Meta:
        model = ScholarshipApplication
        fields = '__all__'
    
    def create(self, validated_data):
        validated_data['scholarship'] = self.context.get('scholarship')
        validated_data['applicant'] = self.context.get('applicant')
        return super().create(validated_data)
    
class ScholarshipTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScholarshipTags
        fields = '__all__'

    def create(self, validated_data):
        validated_data['scholarship'] = self.context.get('scholarship')
        return super().create(validated_data)