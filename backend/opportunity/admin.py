from django.contrib import admin

# Register your models here.
from . import models
admin.site.register(models.Opportunity)
admin.site.register(models.OpportunityApplication)
admin.site.register(models.OpportunityTags)

