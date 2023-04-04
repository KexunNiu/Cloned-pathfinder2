from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from common.logging.logging_service import Logger

class UserProfileTestCase(APITestCase):
    """
    Tests for the API endpoints that are related to the user profile.
    """
    mentor_list_url=reverse('mentors')  # actual url for the user profile list
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

    # retrieve a list of all mentors while the request user is authenticated. There is currently no mentor in the database, so list should be empty.
    def test_mentor_list_authenticated_no_mentor(self):
        response=self.client.get(self.mentor_list_url)
        # assert there is no mentor in the list i.e. list is empty
        self.assertFalse(response.data)

    # retrieve a list of all mentors while the request user is authenticated. We will add one mentor in the database, so list should contain one mentor.
    def test_mentor_list_authenticated_one_mentor(self):
        # update user role to mentor
        response = self.client.patch(reverse('profile',kwargs={'pk':self.id}), data={'role': 'Mentor'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        #response=self.client.get(self.mentor_list_url)
        response=self.client.get(self.mentor_list_url)
        # assert there is one mentor in the list
        self.assertEqual(len(response.data),1)

    # retrieve a list of all mentors while the request user is not authenticated
    def test_mentor_list_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response=self.client.get(self.mentor_list_url)
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)