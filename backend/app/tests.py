from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.test import TestCase
from common.logging.logging_service import Logger

class UserProfileTestCase(APITestCase):
    """
    Tests for the API endpoints that are related to the user profile.
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

    # retrieve a list of all user profiles while the request user is authenticated
    def test_userprofile_list_authenticated(self):
        response=self.client.get(self.profile_list_url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    # retrieve a list of all user profiles while the request user is unauthenticated
    def test_userprofile_list_unauthenticated(self): 
        self.client.force_authenticate(user=None)
        response=self.client.get(self.profile_list_url)
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

    # check to retrieve the profile details of the authenticated user
    def test_userprofile_detail_retrieve(self):
        response=self.client.get(reverse('profile',kwargs={'pk':self.id}))
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    # populate the user profile that was automatically created using the signals
    def test_userprofile_populate(self):
        profile_data={'bio':'I am a very famous game character','interests':'computers,python','skills':'eating mushrooms','isMentor':False}
        response=self.client.put(reverse('profile',kwargs={'pk':self.id}),data=profile_data)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    # test to update the user profile of another user (not allowed)
    def test_userprofile_update_not_owner(self):
        # create a new user making a post request to djoser endpoint
        self.user=self.client.post('/auth/users/',data={'username':'luigi','password':'i-keep-jumping'})
        # obtain a json web token for the newly created user
        response=self.client.post('/auth/jwt/create/',data={'username':'luigi','password':'i-keep-jumping'})
        self.token=response.data['access']
        self.api_authentication()
        profile_data={'bio':'I am a not so famous game character','interests':'computers,python','skills':'eating green mushrooms','isMentor':False}
        # update data of mario profile while signed in as luigi. 
        response=self.client.put(reverse('profile',kwargs={'pk':self.id}),data=profile_data)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)
    
    # test to delete the user profile
    def test_user_delete(self):
        response=self.client.delete(reverse('profile',kwargs={'pk':self.id}))
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)

    # test adding a user with a name that already exists
    def test_user_already_exists(self):
        response = self.client.post('/auth/users/',data={'username':'mario','password':'i-keep-jumping'})
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    # test getting a list of regular users only
    def test_regular_user_list_authenticated(self):
        response=self.client.get(reverse('regular-users'))
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    # test getting a list of regular users while unauthenticated
    def test_regular_user_list_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response=self.client.get(reverse('regular-users'))
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

