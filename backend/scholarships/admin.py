from django.contrib import admin

from . import models
# register scholarship model
admin.site.register(models.Scholarship)
admin.site.register(models.ScholarshipApplication)
admin.site.register(models.ScholarshipTags)