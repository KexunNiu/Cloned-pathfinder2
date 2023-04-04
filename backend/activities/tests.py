from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from common.logging.logging_service import Logger
from .models import Activity

class ActivityTestCase(APITestCase):
    """
    Tests for the API endpoints that are related activities.
    """
    activity_list_url=reverse('all-activities')  # actual url for the activity list
    def setUp(self):
        # create a new user making a post request to djoser endpoint
        self.user=self.client.post('/auth/users/',data={'username':'mario','password':'i-keep-jumping'})
        # obtain a json web token for the newly created user
        response=self.client.post('/auth/jwt/create/',data={'username':'mario','password':'i-keep-jumping'})
        self.token=response.data['access']
        self.api_authentication()
        self.activity=Activity.objects.create(name='test activity',description='test description',link='test link')  # create mock activity. This would be done manually by admin.

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.token)

    # retrieve a list of all activities while the request user is authenticated
    def test_activity_list_authenticated(self):
        response=self.client.get(self.activity_list_url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    # retrieve a list of all activities while the request user is unauthenticated
    def test_activity_list_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response=self.client.get(self.activity_list_url)
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

    # check to retrieve the activity details of a specific activity
    def test_activity_detail_retrieve(self):
        response=self.client.get(reverse('activity',kwargs={'pk':self.activity.id}))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
