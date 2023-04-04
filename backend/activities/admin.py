from django.contrib import admin

from .models  import Question, Result, Test, UserAnswers,Activity, ActivityApplication, ActivityTags


admin.site.register(Activity)
admin.site.register(ActivityApplication)
admin.site.register(ActivityTags)