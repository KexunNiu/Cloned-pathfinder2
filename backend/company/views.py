from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView,ListAPIView)
from rest_framework.permissions import IsAuthenticated
from .models import CompanyProfile,ConnecttoCompany,Companyapplication
from .permission import IsOwnerProfileOrReadOnly
from .serializers import CompanySerializer,ConnecttoCompanySerializer,CompanyapplicationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import userProfile
from company.models import CompanyProfile

from rest_framework import generics, status

from activities.models import Activity, ActivityApplication
from activities.serializers import ActivitySerializer, ActivityApplicationSerializer
from scholarships.models import Scholarship, ScholarshipApplication
from scholarships.serializers import ScholarshipSerializer, ScholarshipApplicationSerializer
from opportunity.models import Opportunity, OpportunityApplication
from opportunity.serializers import OpportunitySerializer, OpportunityApplicationSerializer

from app.serializers import RegularUserSerializer


class CompanyListApiView(ListAPIView):
    """ 
    this will give a list of all the regular user who do not have mentor and company status
    
    """
    queryset=CompanyProfile.objects.all()
    serializer_class=CompanySerializer
    permission_classes=[IsAuthenticated] # add permission to check if user is authenticated

    
    
class CompanyProfileView(RetrieveUpdateDestroyAPIView):
    """
    Display an individual company profile

    """
    queryset=CompanyProfile.objects.all()
    serializer_class=CompanySerializer

    
    permission_classes=[IsAuthenticated]

class CompanyapplicationApiView(ListCreateAPIView):
    """ 
    this  create a company application in the admin dashboard for the admin to review it and approve it
    
    """
    queryset=Companyapplication.objects.all()
    serializer_class=CompanyapplicationSerializer
    #permission_classes=[IsAuthenticated] # add permission to check if user is authenticated

class CompanyapplicationEditView(RetrieveUpdateDestroyAPIView):
    """ 
    this  edit a company application in the admin dashboard for the admin to review it and approve it
    
    """
    queryset=Companyapplication.objects.all()
    serializer_class=CompanyapplicationSerializer
    permission_classes=[IsOwnerProfileOrReadOnly,IsAuthenticated]

class CreateConnecttoCompanyView(ListCreateAPIView):
    """ 
    this is to create a company follow request by user if the user wants to connect to a company
    
    """
    queryset = ConnecttoCompany.objects.all()
    serializer_class = ConnecttoCompanySerializer
    permission_classes=[IsAuthenticated]
    def send_follow_request(request, id):
        sender = request.user
        receiver = CompanyProfile.objects.get(id=id)
        rel = ConnecttoCompany.objects.create(User_name=sender, Company_name=receiver, status='pending')
        return Response({'status': 'Request sent'}, status=201)

class ListActivityOppScholarViewSet(generics.ListAPIView):
    #Get all activities, opportunities and scholarships objects
    ActivityQueryset = Activity.objects.all()
    ScholarshipQueryset = Scholarship.objects.all()
    OpportunityQueryset = Opportunity.objects.all()

    #serialize the data
    activity_serializer_class = ActivitySerializer
    scholarship_serializer_class = ScholarshipSerializer
    opportunity_serializer_class = OpportunitySerializer

    #override the get method to return all activity, opportunity and scholarship objects
    def get(self, request, *args, **kwargs):
        # id = self.kwargs['id']
        # user = userProfile.objects.filter(id=id).first()
        company_profile = CompanyProfile.objects.filter(company_user=request.user).first()
        company_profile_id = 1
        if company_profile:
            company_profile_id = company_profile.pk
        activity_queryset = self.ActivityQueryset.filter(company__id=company_profile_id)
        scholar_queryset = self.ScholarshipQueryset.filter(company__id=company_profile_id)
        oppo_queryset = self.OpportunityQueryset.filter(company__id=company_profile_id)

        # activity_serializer = self.activity_serializer_class(activity_queryset, many=True)
        # scholar_serializer = self.scholarship_serializer_class(scholar_queryset, many=True)
        # oppo_serializer = self.opportunity_serializer_class(oppo_queryset, many=True)

        #find applicants for each activity then put then in a new dict
        activity_applicants = []
        for activity in activity_queryset:

            activity_applicants.append({
                'activity': self.activity_serializer_class(activity).data,
                #only return applicant id and name
                'applicants': [{'id':applicant.applicant.id,'Name':applicant.applicant.first_name+" "+applicant.applicant.last_name,'Bio':applicant.applicant.bio,'Talents':applicant.applicant.Talents,'Background':applicant.applicant.background,'Interests':applicant.applicant.interests,'Skills':applicant.applicant.skills, 'Details':applicant.details, 'Recommended': applicant.recommend,'Date': applicant.date_applied} for applicant in ActivityApplication.objects.filter(activity=activity)]
            })

        #find applicants for each scholarship then put then in a new dict
        scholarship_applicants = []
        for scholarship in scholar_queryset:

            scholarship_applicants.append({
                'scholarship': self.scholarship_serializer_class(scholarship).data,
                #only return applicant id and name
                'applicants': [{'id':applicant.applicant.id,'Name':applicant.applicant.first_name+" "+applicant.applicant.last_name,'Bio':applicant.applicant.bio,'Talents':applicant.applicant.Talents,'Background':applicant.applicant.background,'Interests':applicant.applicant.interests,'Skills':applicant.applicant.skills, 'Details':applicant.details, 'Recommended': applicant.recommend,'Date': applicant.date_applied} for applicant in ScholarshipApplication.objects.filter(scholarship=scholarship)]
            })

        #find applicants for each job postings then put then in a new dict
        job_applicants = []
        for job in oppo_queryset:
                
            job_applicants.append({
                'job': self.opportunity_serializer_class(job).data,
                #only return applicant id and name
                'applicants': [{'id':applicant.applicant.id,'Name':applicant.applicant.first_name+" "+applicant.applicant.last_name,'Bio':applicant.applicant.bio,'Talents':applicant.applicant.Talents,'Background':applicant.applicant.background,'Interests':applicant.applicant.interests,'Skills':applicant.applicant.skills, 'Details':applicant.details, 'Recommended': applicant.recommend,'Date': applicant.date_applied} for applicant in OpportunityApplication.objects.filter(opportunity=job)]
            })
        
        return Response({'activities': activity_applicants,'scholarships': scholarship_applicants, 'job_postings': job_applicants}, status=status.HTTP_200_OK)
    
    
class ListAllActivityOppScholarViewSet(ListAPIView):
    """
    This API view list all opportunity, scholarship and activity objects
    """
      #Get all activities, opportunities and scholarships objects
    ActivityQueryset = Activity.objects.all()
    ScholarshipQueryset = Scholarship.objects.all()
    OpportunityQueryset = Opportunity.objects.all()

    #serialize the data
    activity_serializer_class = ActivitySerializer
    scholarship_serializer_class = ScholarshipSerializer
    opportunity_serializer_class = OpportunitySerializer
    
    #override the get method to return all activity, opportunity and scholarship objects
    def get(self, request, *args, **kwargs):
        company_profile = CompanyProfile.objects.filter(company_user=request.user).first()
        company_profile_id = 1
        if company_profile:
                company_profile_id = company_profile.pk
    
        activity_queryset = self.ActivityQueryset.all()
        scholar_queryset = self.ScholarshipQueryset.all()
        oppo_queryset = self.OpportunityQueryset.all()

        activity_serializer = self.activity_serializer_class(activity_queryset, many=True)
        scholar_serializer = self.scholarship_serializer_class(scholar_queryset, many=True)
        oppo_serializer = self.opportunity_serializer_class(oppo_queryset, many=True)
        
        for app in ActivityApplication.objects.all():
            app.recommend = any(word in app.activity.description.lower().split(" ") for word in app.applicant.Talents.lower().split(" ")) or any(word in app.activity.description.lower().split(" ") for word in app.details.lower().split(" "))
            print(app.recommend)
            app.save()

        for app in ScholarshipApplication.objects.all():
            app.recommend = any(word in app.scholarship.description.lower().split(" ") for word in app.applicant.Talents.lower().split(" ")) or any(word in app.scholarship.description.lower().split(" ") for word in app.details.lower().split(" "))
            print(app.recommend)
            app.save()
        
        for app in OpportunityApplication.objects.all():
            app.recommend = any(word in app.opportunity.job_description.lower().split(" ") for word in app.applicant.Talents.lower().split(" ")) or any(word in app.opportunity.job_description.lower().split(" ") for word in app.details.lower().split(" "))
            print(app.recommend)
            app.save()

        #find applicants for each activity then put then in a new dict
        activity_applicants = []
        for activity in activity_queryset:
            activity_applicants.append({
                'activity': self.activity_serializer_class(activity).data,
                #only return applicant id and name
                'applicants': [{'id':applicant.applicant.id,'Name':applicant.applicant.first_name+" "+applicant.applicant.last_name,'Bio':applicant.applicant.bio,'Talents':applicant.applicant.Talents,'Background':applicant.applicant.background,'Details':applicant.details, 'Date':applicant.date_applied,'Recommended': applicant.recommend,'Interests':applicant.applicant.interests,'Skills':applicant.applicant.skills} for applicant in ActivityApplication.objects.filter(activity=activity)]
            })

           

        #find applicants for each scholarship then put then in a new dict
        scholarship_applicants = []
        for scholarship in scholar_queryset:
            
            scholarship_applicants.append({
                'scholarship': self.scholarship_serializer_class(scholarship).data,
                #only return applicant id and name
                #'applicants': [{'id':applicant.applicant.id,'Name':applicant.applicant.first_name+" "+applicant.applicant.last_name,'Bio':applicant.applicant.bio,'Talents':applicant.applicant.Talents,'Background':applicant.applicant.background,'Details':applicant.details, 'Recommended': applicant.recommend,'Interests':applicant.applicant.interests,'Skills':applicant.applicant.skills} for applicant in ScholarshipApplication.objects.filter(scholarship=scholarship)]
               
                #'applicants': [{'id':applicant.applicant.id,'Name':applicant.applicant.first_name+" "+applicant.applicant.last_name,'Bio':applicant.applicant.bio,'Talents':applicant.applicant.Talents,'Background':applicant.applicant.background,'Details':applicant.details, 'Recommended': applicant.recommend,'Interests':applicant.applicant.interests,'Skills':applicant.applicant.skills} for applicant in ScholarshipApplication.objects.filter(scholarship=scholarship) if any(word in scholarship.description for word in applicant.applicant.Talents.split(' ')) or any(word in scholarship.description for word in applicant.details.split(' '))]
               'applicants': [{'id':applicant.applicant.id,'Name':applicant.applicant.first_name+" "+applicant.applicant.last_name,'Bio':applicant.applicant.bio,'Talents':applicant.applicant.Talents,'Background':applicant.applicant.background,'Details':applicant.details,'Date':applicant.date_applied, 'Recommended': applicant.recommend,'Interests':applicant.applicant.interests,'Skills':applicant.applicant.skills} for applicant in ScholarshipApplication.objects.filter(scholarship=scholarship)]
            })

        #find applicants for each job postings then put then in a new dict
        job_applicants = []
        for job in oppo_queryset:
                
            job_applicants.append({
                'job': self.opportunity_serializer_class(job).data,
                #only return applicant id and name
                'applicants': [{'id':applicant.applicant.id,'Name':applicant.applicant.first_name+" "+applicant.applicant.last_name,'Bio':applicant.applicant.bio,'Talents':applicant.applicant.Talents,'Details':applicant.details, 'Date':applicant.date_applied,'Recommended': applicant.recommend,'Background':applicant.applicant.background,'Interests':applicant.applicant.interests,'Skills':applicant.applicant.skills} for applicant in OpportunityApplication.objects.filter(opportunity=job)]
            })

        return Response({'activities': activity_applicants,'scholarships': scholarship_applicants, 'job_postings': job_applicants}, status=status.HTTP_200_OK)

class ListUserActivityOppScholarViewSet(ListAPIView):
    """
    List all activities applications, opportunities applications and scholarships applications for a user whose id = id
    id in the url is the user id
    """

    #Get all activities, opportunities and scholarships objects
    ActivityApplicationQueryset = ActivityApplication.objects.all()
    ScholarshipApplicationQueryset = ScholarshipApplication.objects.all()
    OpportunityApplicationQueryset = OpportunityApplication.objects.all()

    #serialize the data
    activity_serializer_class = ActivityApplicationSerializer
    scholarship_serializer_class = ScholarshipApplicationSerializer
    opportunity_serializer_class = OpportunityApplicationSerializer

    #override the get method to return all activity, opportunity and scholarship objects
    def get(self, request, *args, **kwargs):
        
        id = kwargs['id']
        activity_application_queryset = ActivityApplication.objects.filter(applicant__id=id)
        scholarship_application_queryset = ScholarshipApplication.objects.filter(applicant__id=id)
        opportunity_application_queryset = OpportunityApplication.objects.filter(applicant__id=id)

        #respond the querysets
        activity_serializer = self.activity_serializer_class(activity_application_queryset, many=True)
        scholar_serializer = self.scholarship_serializer_class(scholarship_application_queryset, many=True)
        oppo_serializer = self.opportunity_serializer_class(opportunity_application_queryset, many=True)

        return Response({'activities': activity_serializer.data,'scholarships': scholar_serializer.data, 'job_postings': oppo_serializer.data}, status=status.HTTP_200_OK)