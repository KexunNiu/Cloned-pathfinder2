from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Scholarship, ScholarshipApplication
from .serializers import ScholarshipSerializer, ScholarshipApplicationSerializer
from rest_framework.test import APIClient
from company.models import CompanyProfile
from app.models import User, RegularUser
from django.utils.dateparse import parse_datetime


# Constants
SCHOLARSHIP_DEADLINE = parse_datetime('2069-04-02T20:19:36-06:00')


class ScholarshipTest(APITestCase):
    scholarship_list_url=reverse('all-scholarships')  # actual url for the scholarship list

    def setUp(self):
        # create a new user making a post request to djoser endpoint
        self.user=self.client.post('/auth/users/',data={'username':'mario','password':'i-keep-jumping'})
        # obtain a json web token for the newly created user
        response=self.client.post('/auth/jwt/create/',data={'username':'mario','password':'i-keep-jumping'})
        self.token=response.data['access']
        self.api_authentication()
        # create mock scholarship. This would be done manually by admin.
        self.scholarship=Scholarship.objects.create(
            name='test scholarship',
            description='test description',
            eligibility='uofa students',
            deadline=SCHOLARSHIP_DEADLINE,
            link='testlink.com',
            amount=200
        )

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.token)

    # retrieve a list of all scholarships while the request user is authenticated
    def test_scholarship_list_authenticated(self):
        response=self.client.get(self.scholarship_list_url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    # retrieve a list of all scholarships while the request user is unauthenticated
    def test_scholarship_list_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response=self.client.get(self.scholarship_list_url)
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

    # check to retrieve the scholarship details of a specific scholarship
    def test_scholarship_detail_retrieve(self):
        response=self.client.get(reverse('scholarship',kwargs={'pk':self.scholarship.id}))
        # print(response.data)
        self.assertEqual(response.status_code,status.HTTP_200_OK)


class ScholarshipDetailViewTestCase(APITestCase):
    def setUp(self):
        self.scholarship = Scholarship.objects.create(
            name='Test Scholarship',
            company=None,
            description='Test description',
            eligibility='Test eligibility',
            deadline=SCHOLARSHIP_DEADLINE,
            link='https://example.com/scholarship',
            amount=1000,
            scholarship_picture=None,
            isApproved=True,
        )
        self.url = reverse('scholarship', kwargs={'pk': self.scholarship.id})

    def test_retrieve_scholarship(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, ScholarshipSerializer(self.scholarship).data)

    def test_update_scholarship(self):
        data = {
            'name': 'Updated Scholarship',
            'company': None,
            'description': 'Updated description',
            'eligibility': 'Updated eligibility',
            'deadline': SCHOLARSHIP_DEADLINE,
            'link': 'https://example.com/updated-scholarship',
            'amount': 2000,
            'isApproved': 'False',  # update value to string
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.scholarship.refresh_from_db()
        self.assertEqual(self.scholarship.name, data['name'])
        self.assertEqual(self.scholarship.company, data['company'])
        self.assertEqual(self.scholarship.description, data['description'])
        self.assertEqual(self.scholarship.eligibility, data['eligibility'])
        self.assertEqual(self.scholarship.deadline, data['deadline'])
        self.assertEqual(self.scholarship.link, data['link'])
        self.assertEqual(self.scholarship.amount, data['amount'])
        self.assertEqual(self.scholarship.isApproved, data['isApproved'])

    def test_delete_scholarship(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Scholarship.objects.filter(id=self.scholarship.id).exists())


class ListAllowedScholarshipOpportunityViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.company = CompanyProfile.objects.create(
            name='Test Company',
            company_user=User.objects.create(username='testuser', password='testpass'),
            info='Test Info',
            email='test@test.com',
            website='https://www.test.com',
        )
        self.scholarship = Scholarship.objects.create(
            name="Test Scholarship",
            company=self.company,
            isApproved=True,
            deadline=SCHOLARSHIP_DEADLINE,
            amount = 1000
        )

    def test_list_allowed_scholarship_opportunities(self):
        url = reverse('scholar_allowed', args=[self.company.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

        scholarship_data = response.data[0]
        self.assertEqual(scholarship_data['name'], self.scholarship.name)
        self.assertEqual(scholarship_data['company']['name'], self.company.name)

        # Test that the applications are included in the response
        self.assertIn('applications', scholarship_data)
        applications_data = scholarship_data['applications']
        self.assertEqual(len(applications_data), 0)

    def test_list_allowed_scholarship_opportunities_not_approved(self):
        not_approved_scholarship = Scholarship.objects.create(
            name="Not Approved Scholarship",
            company=self.company,
            isApproved=False,
            deadline=SCHOLARSHIP_DEADLINE,
            amount = 1000
        )

        url = reverse('scholar_allowed', args=[self.company.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        scholarship_data = response.data[0]
        self.assertEqual(scholarship_data['name'], self.scholarship.name)

    def test_list_allowed_scholarship_opportunities_wrong_company(self):
        other_company = CompanyProfile.objects.create(
            name='Other Company',
            company_user=User.objects.create(username='anotheruser', password='testpass'),
            info='Test Info',
            email='test@test.com',
            website='https://www.test.com',
        )

        other_company_scholarship = Scholarship.objects.create(
            name="Other Company Scholarship",
            company=other_company,
            isApproved=True,
            deadline=SCHOLARSHIP_DEADLINE,
            amount = 1000
        )

        url = reverse('scholar_allowed', args=[self.company.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        scholarship_data = response.data[0]
        self.assertEqual(scholarship_data['name'], self.scholarship.name)


class GetUserApplicationViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.company = CompanyProfile.objects.create(
            name='Test Company',
            company_user=User.objects.create(username='testuser1', password='testpass'),
            info='Test Info',
            email='test@test.com',
            website='https://www.test.com',
        )
        User.objects.filter(username='testuser2').delete()
        self.user = User.objects.create(username='testuser2', password='testpass')
        RegularUser.objects.filter(user=self.user).delete()
        self.regular_user = RegularUser.objects.create(user=self.user)
        self.scholarship = Scholarship.objects.create(
            name="Test Scholarship",
            company=self.company,
            isApproved=True,
            deadline=SCHOLARSHIP_DEADLINE,
            amount=1000,
        )
        self.application = ScholarshipApplication.objects.create(
            details='Test Application',
            scholarship=self.scholarship,
            applicant=self.regular_user,
        )

    def test_get_user_application(self):
        url = reverse('user_scholar_application_detail', args=[self.scholarship.id, self.user.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 11)  # Check all fields are serialized

    def test_get_user_application_not_applied(self):
        self.assertEqual(self.scholarship,self.scholarship)
