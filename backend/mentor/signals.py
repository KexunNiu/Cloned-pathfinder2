from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import ConnectWithMentee

# signal to send a request from a mentee to the mentor which can later be approved by the admin 
@receiver(post_save,sender=ConnectWithMentee)
def add_mentee_to_mentor(sender, created, instance, **kwargs):
    Mentor_Connect_request_=instance.Mentor
    Mentee_Reply_=instance.Mentee
    if instance.status=='accepted':
        Mentor_Connect_request_.MenteeList.add(Mentee_Reply_.user)
        Mentee_Reply_.MentorsList.add(Mentor_Connect_request_.user)
        Mentor_Connect_request_.save()
        Mentee_Reply_.save()