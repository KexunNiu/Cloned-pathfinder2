from .views import ResultDetailView, ResultListView, TestDetailView, TestListView,TestResultsView
from .views import ActivityListView, ActivityDetailView,ActivityTagsList,ActivityTagsCreate,ActivityTagsDetail,ActivityTagsListAll
from django.urls import path
from .views import *

urlpatterns = [
    path("all-activities",ActivityListView.as_view(),name="all-activities"),
    # retrieves profile details of the currently logged in user
    path('all-activities/create',CreateActivityViewSet.as_view(), name='index'),
    path("activity/<int:pk>",ActivityDetailView.as_view(),name="activity"),
    path("activity/approved/<slug:id>",ListAllowedActivityOpportunityViewSet.as_view(),name="allowed-activities"),
    path('activity/approved/<slug:pk>/<slug:id>',DetailAllowedActivityOpportunityViewset.as_view(), name='allowed_scholar_detail'),

    # urls for all test related activities
    path("tests/",TestListView.as_view()),
    path("test/<slug>/",TestDetailView.as_view()),
    path("results/",ResultListView.as_view()),
    path("results/<pk>/",ResultDetailView.as_view()),
    path("submit/test/",TestResultsView.as_view()),

    #create scholarship application
    path("<slug:id>/application/<slug:pk>/create", CreateActivityApplicationViewSet.as_view(), name='activity_application_create'),
    #list scholarship applications
    path("application-list/", ActivityApplicationListView.as_view(), name='activity_application_list'),
    #retrieve scholarship application
    path("application/<slug:id>/", ActivityApplicationDetailView.as_view(), name='activity_application_detail'),
    path('application/<slug:id>/user/<slug:pk>', getUserApplicationViewSet.as_view(), name='user_act_application_detail'),

    #Retrieve all tags of a activity
    path("activity/<int:pk>/tags/", ActivityTagsList.as_view(), name='activityTag-list'),
     #creates a new tag for a activity
    path("activity/<int:pk>/tags/create/", ActivityTagsCreate.as_view(), name='activityTag-create'),
     # #delete or get a single tag of a activity
    path("activity/<int:pk>/tags/<slug:tag_id>/", ActivityTagsDetail.as_view(), name='activityTag-detail'),
    #get all tags
    path("activity/get/tags/", ActivityTagsListAll.as_view(), name='activityTag-all'),
]