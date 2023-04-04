from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.test import TestCase
from common.logging.logging_service import Logger

class CoursesTestCase(APITestCase):
    """
    Tests for the API endpoints that are related to courses.
    """
    profile_list_url=reverse('all-profiles')  # actual url for the user profile list
    def setUp(self):
        # create a new user making a post request to djoser endpoint
        self.user=self.client.post('/auth/users/',data={'username':'mario','password':'i-keep-jumping'})
        # obtain a json web token for the newly created user
        response=self.client.post('/auth/jwt/create/',data={'username':'mario','password':'i-keep-jumping'})
        self.token=response.data['access']
        self.api_authentication()
        response = self.client.get('/auth/users/me/')  # get id of newly made user
        self.id = response.data['id'] 

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.token)

    # add a course with current user as the owner
    def test_add_course(self):
        course = {'Course': 'Math', 'Description': 'Mathematics', 'user': self.id}
        response=self.client.post(reverse('all-courses'),course)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
    
    # get all courses
    def test_get_courses(self):
        response=self.client.get(reverse('all-courses'))
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    # get courses owned by current user
    def test_get_courses_by_user(self):
        response=self.client.get(reverse('courses',kwargs={'pk':self.id}))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        