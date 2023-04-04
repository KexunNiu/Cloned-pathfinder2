from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView,ListAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import userProfile,RegularUser,ConnectToMentor
from .permission import IsOwnerProfileOrReadOnly
from .serializers import userProfileSerializer,RegularUserSerializer,ConnectToMentorSerializer
from rest_framework import status
from rest_framework.views import APIView
from company.models import CompanyProfile
from company.serializers import CompanySerializer
from rest_framework.generics import get_object_or_404

# Create your views here.

class UserProfileListCreateView(ListCreateAPIView):
    """
    List all :model: `app.userProfile`,
    or create a new :model: `app.userProfile`.

    Authentication required.

    """
    queryset=userProfile.objects.all()
    serializer_class=userProfileSerializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(user=user)

class CompanyProfileList(ListAPIView):
    serializer_class = CompanySerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        queryset = CompanyProfile.objects.filter(company_user=user_id)
        return queryset
     
    


class userProfileDetailView(RetrieveUpdateDestroyAPIView):
    """
    Display an individual :model: `app.userProfile`, 
    or update an existing :model: `app.userProfile`,
    or partial_update an existing :model: `app.userProfile`.
    or delete an existing :model: `app.userProfile`.

    Authentication required to update or delete.
    Non-authenticated users can only view(get).

    """
    queryset=userProfile.objects.all()
    serializer_class=userProfileSerializer
    permission_classes=[IsOwnerProfileOrReadOnly,IsAuthenticated]


class RegularUserListApiView(ListAPIView):
    """ 
    this will give a list of all the regular user who do not have mentor and company status
    
    """
    queryset=RegularUser.objects.all()
    serializer_class=RegularUserSerializer
    permission_classes=[IsAuthenticated] # add permission to check if user is authenticated

class RegularUserSearchListApiView(ListAPIView):
     """ 
     this will give a list of all the regular user who do not have mentor and company status
     
     """
     queryset=RegularUser.objects.all()
     serializer_class=RegularUserSerializer
     permission_classes=[IsAuthenticated] # add permission to check if user is authenticated

     def get(self, request, *args, **kwargs):
         queryset = RegularUser.objects.filter(
             first_name__icontains=request.GET.get('username')
         )
         serializer = self.serializer_class(queryset, many=True)

         return Response(serializer.data, status=200)


class CreateConnectToMentorView(ListCreateAPIView):
    """ 
    this is to send a send follow request to a particular mentor 
    
    """
    queryset = ConnectToMentor.objects.all()
    serializer_class = ConnectToMentorSerializer
    permission_classes=[IsAuthenticated]
    def send_follow_request(request, id):
        sender = request.user
        receiver = userProfile.objects.get(id=id)
        rel = ConnectToMentor.objects.create(Mentee=sender, Mentor=receiver, status='pending')
        return Response({'status': 'Request sent'}, status=201)
    
class CompanyUser(ListAPIView):
    queryset=userProfile.objects.all().filter(role = 'Company')
    serializer_class=userProfileSerializer




        

