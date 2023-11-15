from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from product.models import Product
from shipping.models import Shipping
from shipping.serializers import ShippingSerializer
from product.serializers import ProductSerializer

class ListOrdersView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            orders = Order.objects.order_by('-date_issued').filter(user=user)
            result = []
            print("--------------")
            for order in orders:
                item = {}
                item['status'] = order.status
                item['transaction_id'] = order.transaction_id
                item['amount'] = order.amount
                item['date_issued'] = order.date_issued
                item['address_line_1'] = order.address_line_1

                result.append(item)
            return Response(
                {'orders': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Error de servidor, no se puede acceder a sus ordenes'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ListOrderDetailView(APIView):
    def get(self, request, transactionId, format=None):
        user = self.request.user

        try:
            if Order.objects.filter(user=user, transaction_id=transactionId).exists():
                order = Order.objects.get(user=user, transaction_id=transactionId)
                shipping = Shipping.objects.get(id=order.shipping_id.id)
                result = {}
                result['status'] = order.status
                result['transaction_id'] = order.transaction_id
                result['amount'] = order.amount
                result['full_name'] = order.full_name
                result['address_line_1'] = order.address_line_1
                result['city'] = order.city
                result['postal_zip_code'] = order.postal_zip_code
                result['country_region'] = order.region
                result['telephone_number'] = order.telephone_number
                result['shipping_id'] = shipping.id
                if user.is_anonymous is False:
                    result['email'] = user.email
                else:
                    result['email'] = email

                result['date_issued'] = order.date_issued

                order_items = OrderItem.objects.order_by('-date_added').filter(order=order)
                result['order_items'] = []
                print('--------------ciclo-for-producto--------------')
                for order_item in order_items:
                    product = Product.objects.get(id=order_item.product.id)
                    product = ProductSerializer(product)
                    result['order_items'].append(product.data)
                print(result)
                return Response(
                    {'order': result},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Order with this transaction ID does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
        except Exception:
            print(Exception)
            return Response(
                {'error': 'Something went wrong when retrieving order detail'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )