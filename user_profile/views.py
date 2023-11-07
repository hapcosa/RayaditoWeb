from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer


class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user
            print(user)
            user_profiles = UserProfile.objects.filter(user=user)
            result = []
            for profile in user_profiles:
                item = {}
                item ['id'] = profile.id
                item['first_name']= profile.first_name
                item['last_name']= profile.last_name
                item['address_line_1']= profile.address_line_1
                item['city']= profile.city
                item['zipcode']= profile.zipcode
                item['phone']= profile.phone
                item['country_region']= profile.country_region
                result.append(item)
            
            print(result)
            

            return Response(
                {'profiles': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class CreateUserProfileView(APIView):
    def put(self, request, format=None):
        try:
            print('aqui')
            user = self.request.user
            data = self.request.data
            print(data)
            first_name = data['first_name']
            last_name = data['last_name']
            address_line_1 = data['address_line_1']
            city = data['city']
            zipcode = data['zipcode']
            phone = data['phone']
            country_region = data['country_region']
            
            UserProfile.objects.create(user=user,
                first_name=first_name,
                last_name=last_name,
                address_line_1=address_line_1,
                city=city,
                zipcode=zipcode,
                phone=phone,
                country_region=country_region
            )
           

            return Response(
                {'profile': 'direccion creada'},
                status=status.HTTP_200_OK
            )
        except TypeError:
            print(TypeError)
            return Response(
                {'error': 'Something went wrong when creating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR                                                 
            )        
class UpdateUserProfileView(APIView):
    def put(self, request, format=None):
        try:
            user = self.request.user
            data = self.request.data
            first_name = data['first_name']
            last_name = data['last_name']
            address_line_1 = data['address_line_1']
            city = data['city']
            zipcode = data['zipcode']
            phone = data['phone']
            country_region = data['country_region']

            UserProfile.objects.get(user=user).update(
                first_name=first_name,
                last_name=last_name,
                address_line_1=address_line_1,
                city=city,
                zipcode=zipcode,
                phone=phone,
                country_region=country_region
            )

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response(
                {'profile': user_profile.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR                                                 
            )
class DeleteUserProfileView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        data = self.request.data
        try:
            UserProfile.objects.get(user=user, id=data['profile_id']).delete()
            return Response({'response': 'Dirección elimanda'},
                status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Error al remover direccion'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
         