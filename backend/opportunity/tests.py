from django.test import TestCase
from .models import Opportunity, CompanyProfile
from app.models import RegularUser
from django.contrib.auth.models import User

from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from .views import *
from rest_framework.test import APIClient

class OpportunityModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        user = User.objects.create_user(username="testuser", password="testpass")
        company = CompanyProfile.objects.create(
            name="Test Company",
            company_user=user,
            info="Test Info",
            email="test@test.com",
            website="https://www.test.com",
        )
        Opportunity.objects.create(
            id=1,  # set the id explicitly
            job_title="Test Job Title",
            job_description="Test Job Description",
            company=company,
            job_skills="Test Job Skills",
            isApproved=True,
        )

    def test_job_title_label(self):
        opportunity = Opportunity.objects.get(id=1)
        field_label = opportunity._meta.get_field("job_title").verbose_name
        self.assertEqual(field_label, "job title")

    def test_job_description_max_length(self):
        opportunity = Opportunity.objects.get(id=1)
        max_length = opportunity._meta.get_field("job_description").max_length
        self.assertEqual(max_length, 255)

    def test_object_name_is_job_title(self):
        opportunity = Opportunity.objects.get(id=1)
        expected_object_name = f"{opportunity.job_title}"
        self.assertEqual(expected_object_name, str(opportunity))
        
    def test_is_approved_default_false(self):
        user = User.objects.create_user(username="testuser2", password="testpass2")
        company = CompanyProfile.objects.create(
            name="Test Company 2",
            company_user=user,
            info="Test Info 2",
            email="test2@test.com",
            website="https://www.test2.com",
        )
        opportunity = Opportunity.objects.create(
            job_title="Test Job Title 2",
            job_description="Test Job Description 2",
            company=company,
            job_skills="Test Job Skills 2",
        )
        self.assertFalse(opportunity.isApproved)

class ListOpportunityViewSetTest(TestCase):
    def setUp(self):
        self.client = Client()

        self.company = CompanyProfile.objects.create(
            name='Test Company',
            company_user=User.objects.create(username='testuser', password='testpass'),
            info='Test Info',
            email='test@test.com',
            website='https://www.test.com',
        )

        self.opportunity = Opportunity.objects.create(
            job_title='Test Job Title',
            job_description='Test Job Description',
            company=self.company,
            job_skills='Test Job Skills',
            isApproved=True,
        )

    def test_get_opportunities(self):
        url = reverse('list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class DetailOpportunityViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.company = CompanyProfile.objects.create(
            name='Test Company',
            company_user=User.objects.create(username='testuser', password='testpass'),
            info='Test Info',
            email='test@test.com',
            website='https://www.test.com',
        )

        self.opportunity = Opportunity.objects.create(
            job_title='Test Job Title',
            job_description='Test Job Description',
            company=self.company,
            job_skills='Test Job Skills',
            isApproved=True,
        )

        self.valid_payload = {
            'job_title': 'New Job Title',
            'job_description': 'New Job Description',
            'job_skills': 'New Job Skills',
            'isApproved': False,
            'company': self.company.pk
        }

    def test_get_opportunity(self):
        url = reverse('detail', kwargs={'id': self.opportunity.id})
        response = self.client.get(url)

        opportunity = Opportunity.objects.get(id=self.opportunity.id)
        serializer = OpportunitySerializer(opportunity)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_update_opportunity(self):
        url = reverse('detail', kwargs={'id': self.opportunity.id})
        response = self.client.put(url, self.valid_payload, format='json')

        opportunity = Opportunity.objects.get(id=self.opportunity.id)
        serializer = OpportunitySerializer(opportunity)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_delete_opportunity(self):
        url = reverse('detail', kwargs={'id': self.opportunity.id})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class ListAllowedJobOpportunityViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.company = CompanyProfile.objects.create(
            name='Test Company',
            company_user=User.objects.create(username='testuser', password='testpass'),
            info='Test Info',
            email='test@test.com',
            website='https://www.test.com',
        )

        self.opportunity = Opportunity.objects.create(
            job_title='Test Job Title',
            job_description='Test Job Description',
            company=self.company,
            job_skills='Test Job Skills',
            isApproved=True,
        )
    def test_list_allowed_job_opportunity_view(self):
        response = self.client.get(reverse('allowed', kwargs={'id': self.company.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check that the response data contains the correct opportunity information
        self.assertEqual(response.data[0]['id'], str(self.opportunity.id))
        self.assertEqual(response.data[0]['job_title'], self.opportunity.job_title)
        self.assertEqual(response.data[0]['job_description'], self.opportunity.job_description)
        self.assertEqual(response.data[0]['company']['id'], self.company.id)
        self.assertEqual(response.data[0]['job_skills'], self.opportunity.job_skills)
        self.assertEqual(response.data[0]['isApproved'], str(self.opportunity.isApproved))

        # check that the response data contains the list of applications
        self.assertTrue('applications' in response.data[0])
        applications = OpportunityApplication.objects.filter(opportunity=self.opportunity)
        self.assertEqual(len(response.data[0]['applications']), applications.count())

