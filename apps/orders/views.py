from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from apps.product.models import Product

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
                {'error': 'Something went wrong when retrieving orders'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ListOrderDetailView(APIView):
    def get(self, request, transactionId, format=None):
        user = self.request.user

        try:
            if Order.objects.filter(user=user, transaction_id=transactionId).exists():
                order = Order.objects.get(user=user, transaction_id=transactionId)
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
                result['shipping_name'] = order.shipping_name
                result['date_issued'] = order.date_issued

                order_items = OrderItem.objects.order_by('-date_added').filter(order=order)
                result['order_items'] = []
                print('--------------ciclo-for-producto--------------')
                for order_item in order_items:
                    print(order_item.product.id)
                    product = Product.objects.get(id=order_item.product.id)
                    sub_item = {}
                    sub_item['name'] = order_item.name
                    sub_item['price'] = order_item.price
                    sub_item['description'] = product.description
                    result['order_items'].append(sub_item)
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