from django.urls import include, path
from rest_framework import permissions

from .views import *
urlpatterns = [
    # gets all user profiles and create a new profile
    path("all-profiles",UserProfileListCreateView.as_view(),name="all-profiles"),
    path("regular-users",RegularUserListApiView.as_view(),name="regular-users"),
    path("regular-users/search", RegularUserSearchListApiView.as_view(), name="regular-search"),
    # retrieves profile details of the currently logged in user
    path("profile/<int:pk>",userProfileDetailView.as_view(),name="profile"),
    # url to send a request to connect to a mentor to the admin
    path('SendRequestToMentor',CreateConnectToMentorView.as_view(),name='send_mentor_request'),
    path('companyuser', CompanyUser.as_view(), name='company_user'),
    path ('companytouser/<int:user_id>', CompanyProfileList.as_view(), name='company_profile')
]