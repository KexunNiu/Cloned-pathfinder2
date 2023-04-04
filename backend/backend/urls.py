from django.contrib import admin
from django.urls import path,include
from rest_framework import permissions

# api doc packages
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.conf import settings
from django.conf.urls.static import static
from django.utils import timezone

# set up for documentation
schema_view = get_schema_view(
   openapi.Info(
      title="Pathfinder API",
      default_version='v2',
      description="API for pathfinder platform",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@skillcity.ca"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   #permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),

	#path to djoser end points
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

	#path to our account's app endpoints
    path("api/app/",include("app.urls")),
    path("api/scholarships/",include("scholarships.urls")),
    path("api/activities/",include("activities.urls")),
    path("api/courses/",include("courses.urls")),
    path("api/mentor/",include("mentor.urls")),
    path("api/company/",include("company.urls")),
    path("api/opportunity/", include("opportunity.urls")),
    #api docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
