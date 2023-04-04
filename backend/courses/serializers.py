from rest_framework import serializers
from .models import Courses, CourseTags


# serializers for all the models of courses

class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'

class CourseTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseTags
        fields = '__all__'

    def create(self, validated_data):
        validated_data['courses'] = self.context.get('course')
        return super().create(validated_data)