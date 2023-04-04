from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView)
from .serializers import CoursesSerializer, CourseTagsSerializer
from .models import Courses, CourseTags
from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import userProfile
from rest_framework import status
from django.contrib.auth.models import User

# Create your views here.
class CoursesListView(ListCreateAPIView):
    """
    List all :model: `Courses.course`.
    """
    queryset=Courses.objects.all()
    serializer_class= CoursesSerializer
    #permission_classes=[IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class CoursesDetailView(RetrieveUpdateDestroyAPIView):
    """
    Display an individual :model: `courses.course`.
    """
    queryset=Courses.objects.all()
    serializer_class=CoursesSerializer
    #permission_classes=[IsAuthenticated]

    def retrieve(self, request, pk):
        user = User.objects.filter(id=pk)
        if not user:
            return Response({"response": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
        courses = Courses.objects.filter(user=user[0])
        serializer = CoursesSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CourseTagCreate(CreateAPIView):
    queryset=CourseTags.objects.all()
    serializer_class=CourseTagsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['courses'] = Courses.objects.get(id=self.kwargs['pk'])
        return context

    def post(self, request, *args, **kwargs):

        return self.create(request, *args, **kwargs)

#list all of the scholarships tag
class CoursesTagsListAll(ListAPIView):
    queryset = CourseTags.objects.all()
    serializer_class = CourseTagsSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        tag_set = {}
        for object in queryset:
            if object.tagName in tag_set:
                tag_set[object.tagName].append(object.course.id)
            else:
                tag_set[object.tagName] = [object.course.id]
        return Response({"tag_list": tag_set}, status=status.HTTP_200_OK)
