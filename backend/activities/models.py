from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify
from company.models import CompanyProfile
from app.models import RegularUser
from uuid import uuid4


# Create your models here.
class Activity(models.Model):
    """
    Stores the activity information

    """
    #id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name=models.CharField(max_length=120)
    description=models.TextField()
    company = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name="activity_company",null=True)
    link=models.URLField()
    date_posted = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    deadline = models.DateTimeField(null=True, blank=True)
    activity_picture = models.ImageField(upload_to='activity_picture', null=True,blank=True)
    approvalBoolean =  [('True', 'Approved'), ('False', 'Not Approved')]
    isApproved = models.CharField(default=False,max_length=256,choices=approvalBoolean)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'


class ActivityApplication(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    type = 'Activity'
    details = models.TextField(default="Hello, I want to apply for this activity.")
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name="activity")
    applicant = models.ForeignKey(RegularUser, on_delete=models.CASCADE, related_name="activity_applicant")
    date_applied = models.DateTimeField(auto_now_add=True)
    recommend = models.BooleanField(default=False)

    def __str__(self):
        return "Name: "+self.applicant.user.username + "| Activity: " + self.activity.name

    class Meta:
        verbose_name = 'Activity Application'
        verbose_name_plural = 'Activity Applications'


class Question(models.Model):
    """
    Stores the Question for a particular Test

    """
    ANSWER_CHOICE = (
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ("D",'D'),
    )

    question = models.CharField(max_length=1000)
    option_a = models.CharField(max_length=500)
    option_b = models.CharField(max_length=500)
    option_c = models.CharField(max_length=500)
    option_d = models.CharField(max_length=500)
    marks = models.PositiveIntegerField(default = 1)
    image = models.ImageField(blank=True,null=True,upload_to="media/question",help_text="If any")
    answer = models.CharField(max_length=1,choices=ANSWER_CHOICE,default= 'A')

    def __str__(self):
        return f"{self.question}"

    class Meta:
        verbose_name = 'Test Question'
        verbose_name_plural = 'Test Questions'


class Test(models.Model):
    """
    Stores the Test for a particular Activity

    """
    name = models.CharField(max_length=500)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True)
    questions=models.ManyToManyField(Question)
    total_marks = models.PositiveIntegerField(blank=True,null=True)
    total_questions = models.PositiveIntegerField(blank=True,null=True)
    users_test = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True,related_name="test_users")
    slug = models.SlugField(max_length=400,blank=True,null=True)

    def save(self, *args, **kwargs):
        copy_slug = slugify(self.name)
        queryset = Test.objects.filter(slug__iexact=copy_slug).count()
        count = 1
        slug = copy_slug

        while(queryset):
            query = Test.objects.get(slug__iexact= slug)
            if(query.id == self.id):
                break
            slug = copy_slug + "-" + str(count)
            count += 1
            queryset = Test.objects.get(slug__iexact=slug).count()

        self.slug = slug
        super(Test, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_questions(self):
        return self.questions.all()

    def get_all_questions(self):
        return self.questions.all().count()

    class Meta:
        verbose_name = 'Test'
        verbose_name_plural = 'Tests'


class UserAnswers(models.Model):
    """
    Stores the user responses to a questions on the Tests in a Activity

    """
    ANSWER_CHOICE = (
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ("D",'D'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    test = models.ForeignKey(Test,on_delete=models.CASCADE)
    question = models.ForeignKey(Question,on_delete=models.CASCADE)
    user_answer = models.CharField(max_length=2,choices=ANSWER_CHOICE)
    result = models.ForeignKey("Result",on_delete=models.CASCADE,related_name="answers",blank=True,null=True)
    answer = models.CharField(max_length=2,choices=ANSWER_CHOICE,null=True,blank=True)

    def __str__(self):
        return f"User Response of {self.test} in {self.question}"

    class Meta:
        verbose_name = 'Test Answer'
        verbose_name_plural = 'Test Answers'


class Result(models.Model):
    """
    Stores the Results for a test completed by a user

    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    test = models.ForeignKey(Test,on_delete = models.CASCADE)
    obtained_marks = models.IntegerField(null=True,blank=True)
    total_marks = models.IntegerField(null=True,blank=True)
    response = models.ManyToManyField(UserAnswers,blank=True,related_name="user_response")

    def save(self, *args, **kwargs):
        self.total_marks = self.test.total_marks
        super(Result, self).save(*args, **kwargs)

    def __str__(self):
        return f"Result of {self.user} in {self.test.name} "

    class Meta:
        verbose_name = 'Test Result'
        verbose_name_plural = 'Test Results'


class ActivityTags(models.Model):
    """
    Stores the Tags for a particular Activity

    """
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    tagName = models.CharField(max_length=255)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name="activity_tags")

    def __str__(self):
        return self.tagName

    class Meta:
        verbose_name = 'Activity Tag'
        verbose_name_plural = 'Activity Tags'
