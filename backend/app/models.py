from django.db import models
from django.contrib.auth.models import User


class userProfile(models.Model):
    """
    Stores the user profile information related to a :model: `auth.User`.

    """
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    profile_picture = models.ImageField(upload_to='profile_picture', null=True,blank=True)
    bio=models.TextField(blank=True,null=True)
    Talents=models.TextField(blank=True,null=True)
    background=models.TextField(blank=True,null=True)
    MakeMeMentor= models.BooleanField(default=False)
    ROLES = (('User/YoungPeople', 'User/YoungPeople'),('Mentor', 'Mentor'),('Company', 'Company'))
    role = models.CharField(
        max_length=20,
        choices=ROLES,
        default='User/YoungPeople'
    )
    MentorsList=models.ManyToManyField(User,related_name='Mentor',blank=True)
    MenteeList=models.ManyToManyField(User,related_name='Mentees',blank=True)# if the user is a mentor, the model will use a MenteeList
    CompanyFollowerList=models.ManyToManyField('company.CompanyProfile',related_name='Followers',blank=True)
    interests=models.CharField(max_length=240,blank=True,null=True)
    skills=models.CharField(max_length=120,blank=True,null=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'All Users'


class RegularUser_Manager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(role='User/YoungPeople')


class RegularUser(userProfile):
    """
    Proxy class to Store the userlist of users who are not a mentor or company but regular users

    """
    objects = RegularUser_Manager()

    class Meta:
        proxy = True
        verbose_name = 'Regular User'
        verbose_name_plural = 'Regular Users'


class RequestToBeMentor_Manager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(MakeMeMentor=True)


class RequestToBeMentor(userProfile):
    """
    Proxy class to Store the userlist of users who want to become a Mentor

    """
    objects = RequestToBeMentor_Manager()

    def save(self  , *args , **kwargs):
        if self.role == 'Mentor':
            self.MakeMeMentor = False
        return super().save(*args , **kwargs)

    class Meta:
        proxy = True
        verbose_name = 'Mentor Application Request'
        verbose_name_plural = 'Mentor Application Requests'


STATUS_CHOICES ={
    # status of requests
    ('pending','pending'),
    ('accepted','accepted'),
}


class ConnectToMentor(models.Model):
    """
    class to Connect a regular User to a Mentor

    """
    Mentee = models.ForeignKey(userProfile, on_delete=models.CASCADE, related_name="Mentee_to_mentor")
    Mentor = models.ForeignKey(userProfile, on_delete=models. CASCADE, related_name="Mentor_To_mentee")
    status = models.CharField(max_length=8, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.Mentee}-{self.Mentor}-{self.status}"

    class Meta:
        verbose_name = 'Mentor Connection Request'
        verbose_name_plural = 'Mentor Connection Requests'
