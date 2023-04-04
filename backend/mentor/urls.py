from django.urls import include, path
from rest_framework import permissions

from .views import MentorListApiView,CreateConnectWithMenteeView

urlpatterns = [
    # gets all mentors
    path("mentors",MentorListApiView.as_view(),name="mentors"),
]






