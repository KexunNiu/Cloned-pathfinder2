from django.urls import include, path
from rest_framework import permissions

from .views import *

urlpatterns = [
    # gets all user profiles and create a new profile
    path("all-scholarships",ScholarshipListView.as_view(),name="all-scholarships"),
    path('all-scholarships/create',CreateScholarshipViewSet.as_view(), name='index'),
    # retrieves profile details of the currently logged in user
    path("scholarship/<int:pk>",ScholarshipDetailView.as_view(),name="scholarship"),
    path('scholarship/approved/<slug:id>', ListAllowedScholarshipOpportunityViewSet.as_view(), name='scholar_allowed'),
    path('scholarship/approved/<slug:pk>/<slug:id>',DetailAllowedScholarshipOpportunityViewset.as_view(), name='allowed_scholar_detail'),

    #create scholarship application
    path("<slug:id>/application/<slug:pk>/create", CreateScholarshipApplicationViewSet.as_view(), name='application_create'),
    #list scholarship applications
    path("application-list/", ScholarshipApplicationListView.as_view(), name='application_list'),
    #retrieve scholarship application
    path("application/<slug:id>/", ScholarshipApplicationDetailView.as_view(), name='application_detail'),
    path('application/<slug:id>/user/<slug:pk>', getUserApplicationViewSet.as_view(), name='user_scholar_application_detail'),

    #update one function to get a single scholarship
    #retrives tags of a scholarship
    path("scholarship/<int:pk>/tags/", ScholarshipTagsList.as_view(), name='scholarshipTag-list'),
    #creates a new tag for a scholarship
    path("scholarship/<int:pk>/tags/create/", ScholarshipTagsCreate.as_view(), name='scholarshipTag-create'),
    #delete or get a single tag of a scholarship
    path("scholarship/<int:pk>/tags/<slug:tag_id>/", ScholarshipTagsDetail.as_view(), name='scholarshipTag-detail'),
    #get all tags
    path("scholarship/get/tags/", ScholarshipTagsListAll.as_view(), name='scholarshipTag-all'),
]