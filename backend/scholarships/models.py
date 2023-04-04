from django.db import models
from company.models import CompanyProfile
from django import forms
from uuid import uuid4
from app.models import RegularUser


# Create your models here.
class Scholarship(models.Model):
    """
    Stores the scholarship information
    """
    name=models.CharField(max_length=120)
    company = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name="scholarship_company",null=True)
    description=models.TextField()
    eligibility=models.TextField()
    deadline=models.DateTimeField()
    link=models.URLField()
    date_posted=models.DateTimeField(auto_now_add=True,null=True, blank=True)
    amount=models.IntegerField()
    scholarship_picture = models.ImageField(upload_to='scholarship_picture', null=True,blank=True)
    approvalBoolean =  [('True', 'Approved'), ('False', 'Not Approved')]
    isApproved = models.CharField(default=False,max_length=256,choices=approvalBoolean)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Scholarship'
        verbose_name_plural = 'Scholarships'


class ScholarshipApplication(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    type = 'Scholarship'
    details = models.TextField(default="Hello, I want to apply for this scholarship.")
    scholarship = models.ForeignKey(Scholarship, on_delete=models.CASCADE, related_name="scholarship")
    recommend = models.BooleanField(default=False)
    applicant = models.ForeignKey(RegularUser, on_delete=models.CASCADE, related_name="scholar_applicant")
    date_applied = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Name: "+self.applicant.user.username + "| Scholarship: " + self.scholarship.name

    class Meta:
        verbose_name = 'Scholarship Application'
        verbose_name_plural = 'Scholarship Applications'


# Create tags for scholarship, one scholarship can have many tags
class ScholarshipTags(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    scholarship = models.ForeignKey(Scholarship, on_delete=models.CASCADE, related_name="scholarship_tags")
    tagName = models.CharField(max_length=255)

    def __str__(self):
        return self.tagName

    class Meta:
        verbose_name = 'Scholarship Tag'
        verbose_name_plural = 'Scholarship Tags'
