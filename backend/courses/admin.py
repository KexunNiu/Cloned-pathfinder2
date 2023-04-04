from django.contrib import admin

from . import models
# register course model
admin.site.register(models.Courses)
admin.site.register(models.CourseTags)