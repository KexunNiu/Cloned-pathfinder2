from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.userProfile)
admin.site.register(models.RegularUser)
admin.site.register(models.RequestToBeMentor)
admin.site.register(models.ConnectToMentor)
