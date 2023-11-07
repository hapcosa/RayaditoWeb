from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

class Error404View(APIView):
    def get(self, request, format=None):
        return Response({'error': 'error direccion del backed'},status=status.HTTP_404_NOT_FOUND)