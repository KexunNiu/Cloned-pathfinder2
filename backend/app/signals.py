from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import userProfile,ConnectToMentor
from company.models import CompanyProfile




@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """
    Create a :model: `app.userProfile` and 'company.CompanyProfile' instance for every new :model: `auth.User` instance.

    """
    if created:
        if instance.last_name == 'Company':
            CompanyProfile.objects.create(company_user=instance,id=instance.id)      
        else:
            userProfile.objects.create(user=instance,id=instance.id, first_name=instance.first_name, last_name=instance.last_name)

# signal to add a mentor to a user if approved by the admin
@receiver(post_save,sender=ConnectToMentor)
def add_mentor_to_mentee(sender, created, instance, **kwargs):
    Mentee_to_mentor_=instance.Mentee
    Mentor_To_mentee_=instance.Mentor
    if instance.status=='accepted':
        Mentee_to_mentor_.MentorsList.add(Mentor_To_mentee_.user)
        Mentor_To_mentee_.MenteeList.add(Mentee_to_mentor_.user)
        Mentee_to_mentor_.save()
        Mentor_To_mentee_.save()





