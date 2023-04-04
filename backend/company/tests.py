from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.test import TestCase
from common.logging.logging_service import Logger

class CompanyTestCase(APITestCase):
    """
    Tests for the API endpoints that are related to the company.
    """
    company_list_url=reverse("Company-users")  # actual url for the user profile list
    def setUp(self):
        # create a new user making a post request to djoser endpoint
        self.user=self.client.post('/auth/users/',data={'username':'mario','password':'i-keep-jumping', 'last_name':'Company'})
        # obtain a json web token for the newly created user
        response=self.client.post('/auth/jwt/create/',data={'username':'mario','password':'i-keep-jumping'})
        self.token=response.data['access']
        self.api_authentication()
        response = self.client.get('/auth/users/me/')  # get id of newly made user
        self.id = response.data['id']
    
    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.token)

    # test getting a list of companies
    def test_company_user_list_authenticated(self):
        response=self.client.get(reverse('Company-users'))
        self.assertEqual(response.status_code,status.HTTP_200_OK)



