from django.urls import include, path
from rest_framework import permissions

from .views import CoursesDetailView, CoursesListView, CourseTagCreate, CoursesTagsListAll

urlpatterns = [
    # gets all user profiles and create a new profile
    path("all-courses",CoursesListView.as_view(),name="all-courses"),
    # retrieves profile details of the currently logged in user
    path("courses/<int:pk>",CoursesDetailView.as_view(),name="courses"),
    path("courses/<int:pk>/tags/create/", CourseTagCreate.as_view(), name='courseTag-create'),
    path("courses/get/tags/", CoursesTagsListAll.as_view(), name='courseTag-all'),
]