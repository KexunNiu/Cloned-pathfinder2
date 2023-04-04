from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password
from .models import ConnecttoCompany,CompanyProfile,Companyapplication
from django.core.mail import send_mail
import os

def send_email(subject: str, body: str, send_email: str) -> bool:
    '''
    Sends single email
    
    '''
    did_send = send_mail(
        subject, 
        body, 
        f'hello@{os.environ.get("BASE_HOST", default=True)}',
        [send_email],
        fail_silently=False,
    )
    return did_send

# signal to send a request from a mentee to the company which can later be approved by the admin 
@receiver(post_save,sender=ConnecttoCompany)
def  add_company_to_mentee(sender, created, instance, **kwargs):
    User_to_company_=instance.User_name
    company_to_User_=instance.Company_name
    if instance.status=='accepted':
        User_to_company_.CompanyFollowerList.add(company_to_User_)
        company_to_User_.Marked_Connections.add(User_to_company_.user)
        User_to_company_.save()
        company_to_User_.save()

 
# signal to send email with all login information for a company if the application is approved by the admin
@receiver(post_save,sender=Companyapplication)
def  ApproveCompany(sender, created, instance, **kwargs):
    if instance.status=='accepted':
        password = User.objects.make_random_password(length=10, allowed_chars="abcdefghjkmnpqrstuvwxyz01234567889")
        credentials = 'Hi, Welcome to Pathfinder your login credentials are username:{} and password:{}'.format(instance.Company_email, password)
        send_email("credentials for Pathfinder",credentials,instance.Company_email)
        User.objects.create(username=instance.Company_email, password=make_password(password, salt=None, hasher='default'),last_name='Company')


