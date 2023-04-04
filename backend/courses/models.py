from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4


# Create your models here.
class Courses(models.Model):
    """
    Stores the courses information related to a :model: `auth.User`.

    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Courses', null=True)
    Course=models.CharField(max_length=20)
    Description=models.TextField()

    def __str__(self):
        return self.Course

    class Meta:
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'

# Create tags for courses, one course can have many tags
class CourseTags(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, related_name="course_tags")
    tagName = models.CharField(max_length=255)

    def __str__(self):
        return self.tagName

    class Meta:
        verbose_name = 'Course Tag'
        verbose_name_plural = 'Course Tags'
