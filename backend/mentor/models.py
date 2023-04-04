from django.db import models
from django.contrib.auth.models import User
from app.models import userProfile


# Create your models here.
class MentorManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(role='Mentor')


class Mentor(userProfile):
    """
    Proxy class to Store the userlist of users who are Mentor or have Mentor Status
    """
    objects = MentorManager()

    class Meta:
        proxy = True
        verbose_name = 'Mentor'
        verbose_name_plural = 'Mentors'


STATUS_CHOICES ={
    ('pending','pending'),
    ('accepted','accepted'),
}


class ConnectWithMentee(models.Model):
    """
    class to Connect a Mentor to a regular user
    """
    Mentor = models.ForeignKey(userProfile, on_delete=models.CASCADE, related_name="Mentor_Connect_request")
    Mentee = models.ForeignKey(userProfile, on_delete=models.CASCADE, related_name="Mentee_Reply")
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.Mentor}-{self.Mentee}-{self.status}"

    class Meta:
        verbose_name = 'Mentor Connection Request'
        verbose_name_plural = 'Mentor Connection Requests'
