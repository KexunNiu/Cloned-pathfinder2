from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import *
from .serializers import ScholarshipSerializer, ScholarshipApplicationSerializer, ScholarshipTagsSerializer
from .models import Scholarship, ScholarshipApplication, ScholarshipTags
from rest_framework import generics, status
from rest_framework.response import Response
from django.db.models import Q
from app.models import userProfile
from company.models import CompanyProfile
import re
from app.models import userProfile

def extract_words(text):
    words = re.findall(r'\w+', text.lower())
    return set(words)

# Create your views here.
class ScholarshipListView(ListAPIView):
    """
    List all :model: `scholarships.scholarship`.
    """
    queryset=Scholarship.objects.all()
    serializer_class=ScholarshipSerializer
    permission_classes=[IsAuthenticated]
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)



class CreateScholarshipViewSet(CreateAPIView):
    """
    List all :model: `scholarships.scholarship`.
    """
    queryset=Scholarship.objects.all()
    serializer_class=ScholarshipSerializer
    permission_classes=[IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # id = kwargs["id"]
        # user = userProfile.objects.filter(id=id).first()
        company_profile = CompanyProfile.objects.filter(company_user=request.user).first()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(company=company_profile)
            return Response(serializer.data, status=200)
        return Response({"data":  serializer.error_messages}, status=400)


class ScholarshipDetailView(RetrieveAPIView):
    """
    Display an individual :model: `scholarships.scholarship`.
    """
    queryset=Scholarship.objects.all()
    serializer_class=ScholarshipSerializer


    def delete(self, request, *args, **kwargs):
        id = self.kwargs['pk']
        queryset = self.get_queryset().filter(id=id).first()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        id = self.kwargs['pk']
        queryset = self.get_queryset().filter(id=id).first()
        serializer = self.get_serializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListAllowedScholarshipOpportunityViewSet(generics.ListAPIView):
    """
    List all :model: `scholarships.scholarship`.
    """
    queryset=Scholarship.objects.all()
    serializer_class=ScholarshipSerializer

    def get(self, request, *args, **kwargs):
        #return scholarships that are isApproved = True
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(Q(isApproved='True') | Q(company__id=id))
        serializer = self.get_serializer(queryset, many=True)

        #for each scholarship, get the list of applications is belongs to this scholarship
        for i in range(len(serializer.data)):
            #get the opportunity id
            scholarship_id = serializer.data[i]['id']
            #get the list of applications
            applications = ScholarshipApplication.objects.filter(scholarship__id=scholarship_id)

            #append the list of applications to the opportunity
            serializer.data[i]['applications'] = ScholarshipApplicationSerializer(applications, many=True).data
        return Response(serializer.data, status=status.HTTP_200_OK)

class DetailAllowedScholarshipOpportunityViewset(generics.RetrieveUpdateDestroyAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

    def get(self, request, *args, **kwargs):
        #id is company id
        id = self.kwargs['id']
        #pk is job id
        pk = self.kwargs['pk']
        queryset = self.get_queryset().filter(id=pk).first()

        # Only return the opportunity if it is approved or the user owns it
        if queryset.isApproved != 'True' and str(queryset.company.id) != id:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(queryset)

        #append the list of applications to the opportunity
        responseDict = {}

        for item in serializer.data:
            responseDict[item] = serializer.data[item]

        # Get an application for this user and opportunity (if it exists)
        application = ScholarshipApplication.objects.filter(applicant__id=id, scholarship__id=pk).first()

        jsonApp = None

        # Serialize the application if it exists
        if (application):
            jsonApp = ScholarshipApplicationSerializer(application, many=False).data

        # Append application to the opportunity
        responseDict['application'] = jsonApp

        return Response(responseDict, status=status.HTTP_200_OK)

class getUserApplicationViewSet(generics.ListAPIView):
    queryset = ScholarshipApplication.objects.all()
    serializer_class = ScholarshipApplicationSerializer

    def get(self, request, *args, **kwargs):
        #id is Scholarship id
        id = self.kwargs['id']
        #pk is user id
        pk = self.kwargs['pk']

        #check if pk is the applicant of the application
        queryset = self.get_queryset().filter(scholarship__id=id, applicant__id=pk).first()
        if queryset:
            serializer = self.get_serializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            #get the scholarship
            scholarship = Scholarship.objects.filter(id=id).first()

            #serialize the scholarship
            scholarshipSerializer = ScholarshipSerializer(scholarship)

            return Response(scholarshipSerializer.data, status=status.HTTP_200_OK)

class ScholarshipApplicationListView(generics.ListAPIView):
    """
    List all :model: `scholarships.scholarshipapplication`.
    """
    queryset = ScholarshipApplication.objects.all()
    serializer_class = ScholarshipApplicationSerializer
    user = userProfile.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        for application in queryset:
            user_talents = application.applicant.Talents.lower()
            application_details = application.scholarship.description.lower()
            details = application.details.lower()
            user_talents_words = set(user_talents.split(' '))
            application_details_words = set(application_details.split(' '))
            details_words = set(details.split(' '))
            match_words = user_talents_words.intersection(application_details_words) or details_words.intersection(application_details_words)
            match = len(match_words)
            if match > 0:
                application.recommend = True
                application.save()
            else:
                application.recommend = False
                application.save()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CreateScholarshipApplicationViewSet(generics.CreateAPIView):
    """
    This view will create a new scholarship application.
    url is "<slug:id>/application/<slug:pk>/create"
    where id is the applicant's user id and pk is the scholarship is applying for
    """

    queryset = ScholarshipApplication.objects.all()
    serializer_class = ScholarshipApplicationSerializer

    def post(self, request, *args, **kwargs):
        #id here is the applicant's user id
        id = self.kwargs['id']
        #pk here is the scholarship id
        pk = self.kwargs['pk']
        queryset = self.get_queryset().filter(applicant__id=id, scholarship__id=pk).first()

        if queryset:
            return Response({"error": "You have already applied for this scholarship"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(applicant_id=id, scholarship_id=pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ScholarshipApplicationDetailView(generics.RetrieveAPIView):
    """
    Display an individual :model: `scholarships.scholarshipapplication`.
    """
    queryset=ScholarshipApplication.objects.all()
    serializer_class=ScholarshipApplicationSerializer
    user = userProfile.objects.all()
    def get(self, request, *args, **kwargs):
        #id here is the application id
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(id=id).first()
        serializer = self.get_serializer(queryset)

        user_talents = queryset.applicant.Talents.lower()
        application_details = queryset.scholarship.description.lower()
        details = queryset.details.lower()
        user_talents_words = set(user_talents.split(' '))
        application_details_words = set(application_details.split(' '))
        details_words = set(details.split(' '))
        match_words = user_talents_words.intersection(application_details_words)  or details_words.intersection(application_details_words)
        # match = all(word in user_talents for word in application_details)
        match  = len(match_words)

        print(match_words)
        print(match)
        if match > 0:
            queryset.recommend = True
            queryset.save()
        else: 
            queryset.recommend = False
            queryset.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(id=id).first()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(id=id).first()
        serializer = self.get_serializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#list all the tags of a scholarship

#
class ScholarshipTagsList(generics.ListAPIView):
    """
    List all :model: `scholarships.scholarshiptag`.
    """
    queryset=ScholarshipTags.objects.all()
    serializer_class=ScholarshipTagsSerializer

    def get(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        queryset = self.get_queryset().filter(scholarship__id=pk)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#delete or get a single tag of a scholarship
#<int:pk> is the scholarship id
#<int:tag_id> is the tag id
class ScholarshipTagsDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Display an individual :model: `scholarships.scholarshiptag`.
    """
    queryset=ScholarshipTags.objects.all()
    serializer_class=ScholarshipTagsSerializer

    def get(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        tag_id = self.kwargs['tag_id']
        queryset = self.get_queryset().filter(id=tag_id).first()
        serializer = self.get_serializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        tag_id = self.kwargs['tag_id']
        queryset = self.get_queryset().filter(id=tag_id).first()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#can create a new tag for a scholarship
#<int:pk> is the scholarship id
class ScholarshipTagsCreate(generics.CreateAPIView):
    """
    Create a new :model: `scholarships.scholarshiptag`.
    """
    queryset=ScholarshipTags.objects.all()
    serializer_class=ScholarshipTagsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['scholarship'] = Scholarship.objects.get(id=self.kwargs['pk'])
        return context

    def post(self, request, *args, **kwargs):

        return self.create(request, *args, **kwargs)


#list all of the scholarships tag
class ScholarshipTagsListAll(generics.ListAPIView):
    """
    List all :model: `scholarships.scholarshiptag`.
    """
    queryset = ScholarshipTags.objects.all()
    serializer_class = ScholarshipTagsSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        tag_set = {}
        for object in queryset:
            if object.tagName in tag_set:
                tag_set[object.tagName].append(object.scholarship.id)
            else:
                tag_set[object.tagName] = [object.scholarship.id]
        return Response({"tag_list": tag_set}, status=status.HTTP_200_OK)
