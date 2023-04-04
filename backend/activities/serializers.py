from django.conf import settings
from rest_framework import serializers
from .models import Question, Result, Test, UserAnswers,ActivityTags
from django.contrib.auth import get_user_model
from .models import Activity, ActivityApplication
from app.serializers import RegularUserSerializer
from company.serializers import CompanySerializer


User = get_user_model()


# serializers for all the models of activity

class ActivitySerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    class Meta:
        model = Activity
        fields = '__all__'
   

    

    
    

class ActivityApplicationSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(read_only=True)
    # company = CompanySerializer(read_only=True)
    applicant = RegularUserSerializer(read_only=True)
    class Meta:
        model = ActivityApplication
        fields = '__all__'

    def create(self, validated_data):
        validated_data['activity'] = self.context.get('activity')
        validated_data['applicant'] = self.context.get('applicant')
        # validated_data['company'] = self.context.get('company')
        return super().create(validated_data)

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            'id',
            'question',
            'option_a',
            'option_b',
            'option_c',
            'option_d',
            'marks',
            'image',
            'answer',
    ]

class TestSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    class Meta:
        model = Test
        fields = [
            'id',
            'user',
            'name',
            'total_marks',
            'total_questions',
            'slug',
            'questions',
        ]
        lookup_field = 'slug'

    def get_questions(self,obj):
        return QuestionSerializer(obj.questions.all(),many=True).data

    def get_user(self,obj):
        user = User.objects.get(email=obj.user.email)
        return user.username

class UserAnswersSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    question = serializers.SerializerMethodField()
    class Meta:
        model=UserAnswers
        fields = [
            'id',
            'user',
            'user_answer',
            'answer',
            'question',
        ]

    

    def get_question(self,obj):
        return QuestionSerializer(obj.question).data


    def get_user(self,obj):
        user = User.objects.get(email=obj.user.email)
        return f"{user.first_name} {user.last_name}"

class ResultSerializer(serializers.ModelSerializer):
    test = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    response = serializers.SerializerMethodField()
    class Meta:
        model = Result
        fields = [
            'id',
            'user',
            'obtained_marks',
            'total_marks',
            'test',
            'response'
        ]

    def get_test(self,obj):
        return TestSerializer(obj.test).data
    def get_user(self,obj):
        user = User.objects.get(email=obj.user.email)
        return f"{user.first_name} {user.last_name}"

    def get_response(self,obj):
        return UserAnswersSerializer(obj.response.all(),many=True).data
    

#create tags for activity, one activity can have many tags
class ActivityTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityTags
        fields = '__all__'

    def create(self, validated_data):
        validated_data['activity'] = self.context.get('activity')
        return super().create(validated_data)
    