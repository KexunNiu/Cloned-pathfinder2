from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify
from company.models import CompanyProfile
from app.models import RegularUser
from uuid import uuid4
from django import forms


# This is actually the job posting model
class Opportunity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    job_title = models.CharField(max_length=255)
    job_description = models.TextField(max_length=255)
    company = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name="job_company")
    job_skills = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    link=models.URLField(null=True, blank=True)
    opportunity_picture = models.ImageField(upload_to='activity_picture', null=True,blank=True)
    deadline=models.DateTimeField(null=True, blank=True)
    approvalBoolean =  [('True', 'Approved'), ('False', 'Not Approved')]
    isApproved = models.CharField(default=False,max_length=256,choices=approvalBoolean)

    def __str__(self):
        return self.job_title

    class Meta:
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'


class OpportunityApplication(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    type = 'Job_Posting'
    details = models.TextField(default="Hello, I want to apply for this job.")
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE, related_name="opportunity")
    applicant = models.ForeignKey(RegularUser, on_delete=models.CASCADE, related_name="job_posting_applicant")
    date_applied = models.DateTimeField(auto_now_add=True)
    recommend = models.BooleanField(default=False)

    def __str__(self):
        return "Type: " + self.type + "| Name: "+self.applicant.user.username + "| Job: " + self.opportunity.job_title

    class Meta:
        verbose_name = 'Job Application'
        verbose_name_plural = 'Job Applications'


# Create tags for opportunity, one opportunity can have many tags
class OpportunityTags(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE, related_name="opportunity_tags")
    tagName = models.CharField(max_length=255)

    def __str__(self):
        return self.tagName

    class Meta:
        verbose_name = 'Job Tag'
        verbose_name_plural = 'Job Tags'
