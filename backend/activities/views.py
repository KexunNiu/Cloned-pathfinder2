from django.core.paginator import Paginator
from .models import Question, Result, Test, UserAnswers
from rest_framework.generics import *
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import QuestionSerializer, ResultSerializer, TestSerializer
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from .serializers import ActivitySerializer, ActivityApplicationSerializer,ActivityTagsSerializer
from .models import Activity, ActivityApplication, ActivityTags
from rest_framework import generics,status
from company.models import CompanyProfile
from django.db.models import Q
import re
from app.models import userProfile

def extract_words(text):
    words = re.findall(r'\w+', text.lower())
    return set(words)

# Create your views here.
class ActivityListView(ListAPIView):
    """
    List all :model: `activities.Activity`.

    """
    queryset=Activity.objects.all()
    serializer_class=ActivitySerializer
    permission_classes=[IsAuthenticated]
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class CreateActivityViewSet(CreateAPIView):
    """
    List all :model: `scholarships.scholarship`.
    """
    queryset=Activity.objects.all()
    serializer_class=ActivitySerializer
    permission_classes=[IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # id = kwargs["id"]
        # user = userProfile.objects.filter(id=id).first()
        company_profile = CompanyProfile.objects.filter(company_user=request.user).first()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(company=company_profile)
            return Response(serializer.data, status=200)
        return Response({"data": "invalid"}, status=404)




class ActivityDetailView(RetrieveUpdateDestroyAPIView):
    """
    Display an individual :model: `activities.Activity`.

    """
    queryset=Activity.objects.all()
    serializer_class=ActivitySerializer
    permission_classes=[IsAuthenticated]
    def get(self, request, *args, **kwargs):
        pk = self.kwargs["pk"]
        queryset = self.get_queryset().filter(pk=pk).first()
        serializer = self.get_serializer(queryset)

        return Response(serializer.data, status=status.HTTP_200_OK)


    def delete(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        queryset = self.get_queryset().filter(pk=pk).first()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        queryset = self.get_queryset().filter(pk=pk).first()
        serializer = self.get_serializer(queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListAllowedActivityOpportunityViewSet(ListAPIView):
    """
    List all :model: `activities.Activity`.

    """
    queryset=Activity.objects.all()
    serializer_class=ActivitySerializer

    def get(self, request, *args, **kwargs):
        #return those isApproved = True
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(Q(isApproved='True') | Q(company__id=id))
        serializer = self.get_serializer(queryset, many=True)

        #for each scholarship, get the list of applications is belongs to this scholarship
        for i in range(len(serializer.data)):
            #get the opportunity id
            activity_id = serializer.data[i]['id']
            #get the list of applications
            applications = ActivityApplication.objects.filter(activity__id=activity_id)

            #append the list of applications to the opportunity
            serializer.data[i]['applications'] = ActivityApplicationSerializer(applications, many=True).data

        return Response(serializer.data, status=status.HTTP_200_OK)

class DetailAllowedActivityOpportunityViewset(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

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

        responseDict = {}

        for item in serializer.data:
            responseDict[item] = serializer.data[item]

        # Get an application for this user and opportunity (if it exists)
        application = ActivityApplication.objects.filter(applicant__id=id, activity__id=pk).first()

        jsonApp = None

        # Serialize the application if it exists
        if (application):
            jsonApp = ActivityApplicationSerializer(application, many=False).data

        # Append application to the opportunity
        responseDict['application'] = jsonApp

        return Response(responseDict, status=status.HTTP_200_OK)


class getUserApplicationViewSet(generics.ListAPIView):
    queryset = ActivityApplication.objects.all()
    serializer_class = ActivityApplicationSerializer

    def get(self, request, *args, **kwargs):
        #id is Scholarship id
        id = self.kwargs['id']
        #pk is user id
        pk = self.kwargs['pk']

        #check if pk is the applicant of the application
        queryset = self.get_queryset().filter(activity__id=id, applicant__id=pk).first()
        if queryset:
            serializer = self.get_serializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            #get the activity
            activity = Activity.objects.filter(id=id).first()

            #serialize the activity
            activitySerializer = ActivitySerializer(activity)

            return Response(activitySerializer.data, status=status.HTTP_200_OK)



class LargeResultsSetPagination(PageNumberPagination):
    """
    Pagination for large results

    """
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 20
    page_query_param = 'page'

class TestListView(ListAPIView):
    """
    List all :model: `activities.Test`.

    """
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = LargeResultsSetPagination
    serializer_class = TestSerializer
    def get_queryset(self):
        test = Test.objects.exclude(users_test = self.request.user).order_by('-id')
        return test

class ResultListView(ListAPIView):
    """
    List all :model: `activities.Results`.

    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ResultSerializer
    def get_queryset(self):
        query = Result.objects.filter(user = self.request.user).order_by("-id")
        return query

class ResultDetailView(RetrieveAPIView):
    """
    Display an individual :model: `activities.Results`.

    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ResultSerializer
    def get_queryset(self):
        query = Result.objects.filter(user = self.request.user)
        return query

class TestDetailView(RetrieveAPIView):
    """
    Display an individual :model: `activities.Test`.

    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TestSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        tests =  Test.objects.exclude(users_test = self.request.user)
        for test in tests:
            test.save()
        return tests
    lookup_field="slug"


class TestResultsView(APIView):
    """
    API view for get and post user results to a specific test of a activity

    """
    permission_classes = [permissions.AllowAny]

    def post(self, request,format=None):
        data=self.request.data
        slug = data["slug"]
        result = data["result"]

        test = Test.objects.get(slug=slug)
        result_user = Result.objects.create(user=self.request.user,test=test,total_marks=test.total_marks)

        count = 0
        for question in test.questions.all():
            for ques in result:
               if (question.question == ques):
                   #*! We have to create UserAnswers instance despite whether the answer is correct or incorrect.

                    UserAnswers.objects.create(user=self.request.user,test=test,question=question,user_answer=result[ques],result=result_user)

                    if(question.answer == result[ques]):
                        count += question.marks


        result_user.obtained_marks = count
        result_user.save()

        return Response({ "success":"Success" })

class ActivityApplicationListView(generics.ListAPIView):
    """
    List all :model: `scholarships.scholarshipapplication`.
    """
    queryset=ActivityApplication.objects.all()
    serializer_class=ActivityApplicationSerializer
    user = userProfile.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        for application in queryset:
            user_talents = application.applicant.Talents.lower()
            application_details = application.activity.description.lower()
            details = application.details.lower()
            user_talents_words = set(user_talents.split(' '))
            application_details_words = set(application_details.split(' '))
            details_words = set(details.split(' '))
            match_words = user_talents_words.intersection(application_details_words) or details_words.intersection(application_details_words)
            match = len(match_words)
            if match>0:
                application.recommend = True
                application.save()
            else:
                application.recommend = False
                application.save()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
  

class CreateActivityApplicationViewSet(generics.CreateAPIView):
    """
    This view will create a new activity application.
    url is "<slug:id>/application/<slug:pk>/create"
    where id is the applicant's user id and pk is the activity is applying for
    """

    queryset = ActivityApplication.objects.all()
    serializer_class = ActivityApplicationSerializer

    def post(self, request, *args, **kwargs):
        #id here is the applicant's user id
        id = self.kwargs['id']
        #pk here is the activity id
        pk = self.kwargs['pk']
        queryset = self.get_queryset().filter(applicant__id=id, activity__id=pk).first()

        if queryset:
            return Response({"error": "You have already applied for this activity"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(applicant_id=id, activity_id=pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivityApplicationDetailView(generics.RetrieveAPIView):
    """
    Display an individual :model: `scholarships.scholarshipapplication`.
    """
    queryset=ActivityApplication.objects.all()
    serializer_class=ActivityApplicationSerializer
    user = userProfile.objects.all()

    def get(self, request, *args, **kwargs):
        #id here is the application id
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(id=id).first()
        serializer = self.get_serializer(queryset)

        user_talents = queryset.applicant.Talents.lower()
        application_details = queryset.activity.description.lower()
        user_details = queryset.details.lower()
        user_talents_words = set(user_talents.split(' '))
        user_details_words = set(user_details.split(' '))
        application_details_words = set(application_details.split(' '))

        match_words = user_talents_words.intersection(application_details_words) or application_details_words.intersection(user_talents_words) or application_details_words.intersection(user_details_words)
        # match = all(word in user_talents for word in application_details)
        match  = len(match_words)
        # print(user_talents_words)
        # print(application_details_words)
        # print(match_words)
        print('usersssssssssssssssssssssssssssssssss')
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


#list all the tags of a activity
class ActivityTagsList(generics.ListAPIView):
    """
    List all :model: `activities.ActivityTag`.

    """
    queryset=ActivityTags.objects.all()
    serializer_class=ActivityTagsSerializer

    def get(self, request, *args, **kwargs):
        #id here is the activity id
        pk = self.kwargs['pk']
        queryset = self.get_queryset().filter(activity__id=pk)
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class ActivityTagsDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Display an individual :model: `activities.ActivityTag`.

    """
    queryset=ActivityTags.objects.all()
    serializer_class=ActivityTagsSerializer

    def get(self, request, *args, **kwargs):
        #id here is the activity tag id
        tag_id = self.kwargs['tag_id']
        queryset = self.get_queryset().filter(id=tag_id).first()
        serializer = self.get_serializer(queryset)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        tag_id = self.kwargs['tag_id']
        queryset = self.get_queryset().filter(id=tag_id).first()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ActivityTagsCreate(generics.CreateAPIView):
    """
    Create a new :model: `activities.ActivityTag`.

    """
    queryset=ActivityTags.objects.all()
    serializer_class=ActivityTagsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['activity'] = Activity.objects.get(id=self.kwargs['pk'])
        return context

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class ActivityTagsListAll(generics.ListAPIView):
    """
    List all :model: `activities.ActivityTag`.

    """
    queryset=ActivityTags.objects.all()
    serializer_class=ActivityTagsSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
