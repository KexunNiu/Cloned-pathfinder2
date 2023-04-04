from django.urls import include, path
from rest_framework import permissions

from .views import CompanyListApiView,CreateConnecttoCompanyView,CompanyapplicationApiView,CompanyapplicationEditView,CompanyProfileView,ListActivityOppScholarViewSet
from .views import ListAllActivityOppScholarViewSet, ListUserActivityOppScholarViewSet

urlpatterns = [
    # urls to send a application to be a company, connect to the company and company profile
    path("Company-users",CompanyListApiView.as_view(),name="Company-users"),
    path('SendRequestToCompany',CreateConnecttoCompanyView.as_view(),name='send_company_request'),
    path("Companyapplication",CompanyapplicationApiView.as_view(),name="Companyapplication"),
    path("Companyapplicationedit/<int:pk>",CompanyapplicationEditView.as_view(),name="Companyapplicationedit"),
    path("CompanyProfile/<int:pk>",CompanyProfileView.as_view(),name="CompanyProfile"),
    path('company-act-opp-sch-list', ListActivityOppScholarViewSet.as_view(),name='act-opp-sch-list'),
    path('all-act-opp-sch-list/', ListAllActivityOppScholarViewSet.as_view(),name='all-applications-list'),
    path('applications-list/<slug:id>', ListUserActivityOppScholarViewSet.as_view(),name='user-applications-list')
]