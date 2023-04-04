from rest_framework import generics, status
from .models import *
from rest_framework.response import Response
from .serializers import *
from company.models import CompanyProfile
from app.models import userProfile
from django.db.models import Q
import re

#urlpatterns = [
#     path('create/<slug:pk>/',  CreateOpportunity.as_view(), name='index'),
#     path('', ListOpportunity.as_view(), name='list'),
#     path('<slug:id>/', DetailOpportunity.as_view(), name='detail'),
# ]
#modelviewset to create, list opportunity and detail opportunity
def extract_words(text):
    words = re.findall(r'\w+', text.lower())
    return set(words)
class CreateOpportunityViewSet(generics.CreateAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    def post(self, request, *args, **kwargs):

        serializers = self.serializer_class(data=request.data)
        company = CompanyProfile.objects.filter(company_user=request.user).first()
        if serializers.is_valid():
            serializers.save(company=company)
            return Response(serializers.data, status=200)
        return Response(serializers.errors, status=400)

class ListOpportunityViewSet(generics.ListAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class DetailOpportunityViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(id=id).first()
        serializer = self.get_serializer(queryset)

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

class ListAllowedJobOpportunityViewSet(generics.ListAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    def get(self, request, *args, **kwargs):
        #get all opportunity which isApproved is True or company__id = id
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(Q(isApproved='True') | Q(company__id=id))
        serializer = self.get_serializer(queryset, many=True)
        #for each opportunity, get the list of applications is belongs to this opportunity
        for i in range(len(serializer.data)):
            #get the opportunity id
            opportunity_id = serializer.data[i]['id']
            #get the list of applications
            applications = OpportunityApplication.objects.filter(opportunity__id=opportunity_id)

            #append the list of applications to the opportunity
            serializer.data[i]['applications'] = OpportunityApplicationSerializer(applications, many=True).data

        return Response(serializer.data, status=status.HTTP_200_OK)

class DetailAllowedJobOpportunityViewset(generics.RetrieveAPIView):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer

    def get(self, request, *args, **kwargs):
        #id is company id
        id = self.kwargs['id']
        #pk is job id
        pk = self.kwargs['pk']
        queryset = self.get_queryset().get(id=pk)

        # Only return the opportunity if it is approved or the user owns it
        if queryset.isApproved != 'True' and str(queryset.company.id) != id:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(queryset)

        responseDict = {}

        for item in serializer.data:
            responseDict[item] = serializer.data[item]

        # Get an application for this user and opportunity (if it exists)
        application = OpportunityApplication.objects.filter(applicant__id=id, opportunity__id=pk).first()

        jsonApp = None

        # Serialize the application if it exists
        if (application):
            jsonApp = OpportunityApplicationSerializer(application, many=False).data

        # Append application to the opportunity
        responseDict['application'] = jsonApp

        return Response(responseDict, status=status.HTTP_200_OK)

class getUserApplicationViewSet(generics.ListAPIView):
    queryset = OpportunityApplication.objects.all()
    serializer_class = OpportunityApplicationSerializer

    def get(self, request, *args, **kwargs):
        #id is opportunity id
        id = self.kwargs['id']
        #pk is user id
        pk = self.kwargs['pk']

        #check if pk is the applicant of the application
        queryset = self.get_queryset().filter(opportunity__id=id, applicant__id=pk).first()
        if queryset:
            serializer = self.get_serializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            #get the opportunity
            opportunity = Opportunity.objects.filter(id=id).first()

            #serializer the opportunity
            opportunitySerializer = OpportunitySerializer(opportunity)

            return Response(opportunitySerializer.data, status=status.HTTP_200_OK)


#modelviewset to create, list opportunity application and detail opportunity application
class CreateOpportunityApplicationViewSet(generics.CreateAPIView):
    """
    This view will create a new opportunity application.
    url is "<slug:id>/application/<slug:pk>/create"
    where id is the applicant's user id and pk is the opportunity is applying for
    """

    queryset = OpportunityApplication.objects.all()
    serializer_class = OpportunityApplicationSerializer

    def post(self, request, *args, **kwargs):
        #id here is the applicant's user id
        id = self.kwargs['id']
        #pk here is the opportunity id
        pk = self.kwargs['pk']
        queryset = self.get_queryset().filter(applicant__id=id, opportunity__id=pk).first()

        if queryset:
            return Response({"error": "You have already applied for this opportunity"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(applicant_id=id, opportunity_id=pk)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListOpportunityApplicationViewSet(generics.ListAPIView):
    queryset = OpportunityApplication.objects.all()
    serializer_class = OpportunityApplicationSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class DetailOpportunityApplicationViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = OpportunityApplication.objects.all()
    serializer_class = OpportunityApplicationSerializer

    def get(self, request, *args, **kwargs):
        #id here is the application id
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(id=id).first()
        serializer = self.get_serializer(queryset)

        user_talents = self.get_queryset().filter(id=id).first()
        # get description of the opportunity
        application_details = queryset.opportunity.description.lower()
        user_details = queryset.details.lower()
        user_talents_words = set(user_talents.split(' '))
        user_detail_words = set(user_details.split(' '))
        application_details_words = set(application_details.split(' '))

        match_words = user_talents_words.intersection(application_details_words) or application_details_words.intersection(user_detail_words)
        match = len(match_words)
        if match>0:
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


#tags that belong to opportunity.
#single tags can be created, listed
#get all tags that belong to a single opportunity
#list all tags and can create new tags


#people can see all of the opportunity tags for a single opportunity
#the path is path('<slug:id>/tags', ListOpportunityTagsViewSet.as_view(), name='tags-list'),
class ListOpportunityTagsViewSet(generics.ListAPIView):
    queryset = OpportunityTags.objects.all()
    serializer_class = OpportunityTagsSerializer

    def get(self, request, *args, **kwargs):
        id = self.kwargs['id']
        queryset = self.get_queryset().filter(opportunity=id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#people can create new tags for a single opportunity
# the path is path('<slug:id>/tags/create', CreateOpportunityTagsViewSet.as_view(), name='tags-create'),
#to create a new tag, the user need to provide the tag name and the opportunity id
class CreateOpportunityTagsViewSet(generics.CreateAPIView):
    queryset = OpportunityTags.objects.all()
    serializer_class = OpportunityTagsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['opportunity'] = Opportunity.objects.filter(pk=self.kwargs["id"]).first()
        return context

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

#people can see a single tag for a single opportunity
#people can delete a single tag for a single opportunity
#the path is path('<slug:id>/tags/<slug:tag_id>', DetailOpportunityTagsViewSet.as_view(), name='tags-detail')
#use tag_id to search for the tag
class DetailOpportunityTagsViewSet(generics.RetrieveUpdateDestroyAPIView):

    queryset = OpportunityTags.objects.all()
    serializer_class = OpportunityTagsSerializer

    def get(self, request, *args, **kwargs):
        tag_id = self.kwargs['tag_id']
        #search for the tag with the tag_id
        queryset = self.get_queryset().filter(id=tag_id).first()

        serializer = self.get_serializer(queryset)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        tag_id = self.kwargs['tag_id']
        queryset = self.get_queryset().filter(id=tag_id).first()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ListAllOpportunityTagsViewSet(generics.ListAPIView):
    queryset = OpportunityTags.objects.all()
    serializer_class = OpportunityTagsSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        tag_set = {}
        for object in queryset:
            if object.tagName in tag_set:
                tag_set[object.tagName].append(object.opportunity.id)
            else:
                tag_set[object.tagName] = [object.opportunity.id]
        return Response({"tag_list": tag_set}, status=status.HTTP_200_OK)
        