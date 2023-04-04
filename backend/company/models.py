from django.db import models
from django.contrib.auth.models import User
from app.models import userProfile


# Create your models here.
class CompanyProfile(models.Model):
    """
    Stores the Company profile information Once a their application to be a company is approved by the admin.

    """
    name = models.CharField(max_length=100,blank=False,null=True)
    company_user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="Company_profile")
    info=models.TextField(blank=True,null=True)
    role = models.CharField(max_length=20,default='Company',editable=False)
    description=models.TextField(blank=True,null=True)
    email = models.EmailField(max_length=100,blank=False,null=True)
    background_info=models.TextField(blank=True,null=True)
    Marked_Connections =models.ManyToManyField(User,related_name='MarkedConnections',blank=True)
    CompaniesList=models.ManyToManyField(User,related_name='Companies',blank=True)
    website = models.URLField(max_length=100,blank=True,null=True)

    def __str__(self):
        return self.company_user.username

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'


STATUS_CHOICES ={
    # status of company request
    ('pending','pending'),
    ('accepted','accepted'),
}


class Companyapplication(models.Model):
    """
    Stores the Company application for companies to apply/register as a company

    """
    name = models.CharField(max_length=100,blank=False)
    background = models.CharField(max_length=300,blank=False)
    Company_email = models.EmailField(max_length=100,blank=False)
    website = models.URLField(max_length=100,blank=False)
    status = models.CharField(max_length=8,choices=STATUS_CHOICES,blank=True)
    description = models.CharField(max_length=300,blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Company Application Request'
        verbose_name_plural = 'Company Application Requests'


class ConnecttoCompany(models.Model):
    """
    class to Connect a regular User with a Company

    """
    User_name=models.ForeignKey(userProfile,on_delete=models.CASCADE, related_name="User_to_company")
    Company_name=models.ForeignKey(CompanyProfile, on_delete=models. CASCADE, related_name="company_to_User")
    status=models.CharField(max_length=8, choices=STATUS_CHOICES,default='accepted')

    def __str__(self):
        return f"{self.User_name}-{self.Company_name}-{self.status}"

    class Meta:
        verbose_name = 'Company Connection Request'
        verbose_name_plural = 'Company Connection Requests'
