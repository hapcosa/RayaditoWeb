from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Shipping
from .serializers import ShippingSerializer


class GetShippingView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        if Shipping.objects.all().exists():
            shipping_options = Shipping.objects.order_by('name').all()
            shipping_options = ShippingSerializer(shipping_options, many=True)

            return Response(
                {'shipping_options': shipping_options.data},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'No shipping options available'},
                status=status.HTTP_404_NOT_FOUND
            )

class GetShippingOptionId(APIView):
     permission_classes = (permissions.AllowAny, )
     def get(self, request, ShippingId, format=None):
        try:
            shippingId=int(ShippingId)
        except:
            return Response(
                {'error': 'Error datos de envio no validos,\n recargue la pagina o contacte al administrador'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        if Shipping.objects.filter(id=shippingId).exists():
            shipping_option = Shipping.objects.get(id=shippingId)
            shipping_option = ShippingSerializer(shipping_option)

            return Response(
                {'shipping_option': shipping_option.data},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'Opción de envio no valida'},
                status=status.HTTP_404_NOT_FOUND
            )