from django.urls import path
from .views import *

urlpatterns = [
    path('create',  CreateOpportunityViewSet.as_view(), name='index'),
    path('', ListOpportunityViewSet.as_view(), name='list'),
    path('<slug:id>/', DetailOpportunityViewSet.as_view(), name='detail'),
    path('jobs/approved/<slug:id>', ListAllowedJobOpportunityViewSet.as_view(), name='allowed'),
    path('jobs/approved/<slug:pk>/<slug:id>',DetailAllowedJobOpportunityViewset.as_view(), name='allowed_detail'),

    path('<slug:id>/application/<slug:pk>/create', CreateOpportunityApplicationViewSet.as_view(), name='create_application'),
    path('application-list', ListOpportunityApplicationViewSet.as_view(), name='list_application'),
    path('application/<slug:id>/', DetailOpportunityApplicationViewSet.as_view(), name='detail_application'),
    path('application/<slug:id>/user/<slug:pk>', getUserApplicationViewSet.as_view(), name='user_application_detail'),

    path('<slug:id>/tags', ListOpportunityTagsViewSet.as_view(), name='tags-list'),
    path('<slug:id>/tags/create', CreateOpportunityTagsViewSet.as_view(), name='tags-create'),
    path('<slug:id>/tags/<slug:tag_id>', DetailOpportunityTagsViewSet.as_view(), name='tags-detail'),
    path('get/tags/', ListAllOpportunityTagsViewSet.as_view(), name='all-tags'),

]
