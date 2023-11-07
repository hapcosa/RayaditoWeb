from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import permissions, status
from product.models import Product
from product.serializers import ProductSerializer
from carrito.models import Carrito,CarritoItem
from orders.models import *
from user_profile.models import UserProfile
from shipping.models import Shipping
User = settings.AUTH_USER_MODEL
import environ
import mercadopago
from mercadopago.resources import MerchantOrder
from .models import Payments


class ProcessPaymentView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        
        data=self.request.data
        user=self.request.user
        shipping_id = str(data['shipping_id'])
        shipping=Shipping.objects.get(id=shipping_id)
        total_amount = 0
        items = []
        print(data)
        if user.is_anonymous is False:
            profile_id = int(data['profile_id'])
            profile_address = UserProfile.objects.get(id=profile_id)
            email=user.email
            first_name = user.first_name
            last_name = user.last_name
            address_line_1 = profile_address.address_line_1
            city=profile_address.city
            state_province_region =profile_address.country_region
            postal_zip_code =profile_address.zipcode
            telephone_number =profile_address.phone
            cart = Carrito.objects.get(user=user)
            if not CarritoItem.objects.filter(carrito=cart).exists():
                return Response(
                    {'error': 'No tienes productos en tu carrito'},
                    status=status.HTTP_404_NOT_FOUND
                )
            products = CarritoItem.objects.filter(carrito=cart)
            for product in products:
                producto= Product.objects.get(id=product.product.id)
                print(producto)
                productos = {}
                productos['id'] = producto.id
                productos['title'] = producto.name
                productos['currency_id'] = 'CLP'
                productos['description'] = producto.description
                productos['category_id'] = producto.category.id
                productos['quantity'] = 1
                productos['unit_price'] = float(producto.price)
                total_amount += float(producto.price)
                items.append(productos)
        else:

                email=data['email']
                first_name = data['first_name']
                last_name = data['last_name']
                address_line_1 = data['address_line_1']
                city = data['city']
                state_province_region = data['state_province_region']
                postal_zip_code = data['postal_zip_code']
                telephone_number = data['telephone_number']
                products = data['items']
                if products is None:
                    return Response(
                        {'error': 'No tienes productos en tu carrito'},
                        status=status.HTTP_404_NOT_FOUND
                    )

                for num in range(0,len(products)):
                    productos = { }
                    
                    products_dict=products[num]
                    product=products_dict['product']
                    productos['id'] = product['id']
                    productos['title'] = str(product['name'])
                    productos['currency_id'] = 'CLP'
                    productos['description'] = str(product['description'])
                    productos['category_id'] = str(product['category'])
                    productos['quantity'] = 1
                    productos['unit_price'] = float(product['price'])
                    total_amount += float(product['price'])
                    items.append(productos)

         
                
               

        order = Order.objects.create()
        preference_data = {
            "items": items,
            "notification_url": "https://95d7-179-56-146-183.ngrok.io/api/payment/webhook",
            "back_urls": {
                "success": "http://127.0.0.1:5173/checkout",
                "failure": "http://127.0.0.1:5173/",
                "pending": "http://127.0.0.1:5173/"
            },
            
            "auto_return": "approved",
            "external_Reference": order.id,
            "payer": {
                "identification": {
                    "number": "123456789",
                    "type": "other"
                    },
                "name": first_name,
                "surname": last_name,
                "email": email,
                "phone": {
                    "area_code": "+56" ,
                    "number": telephone_number,
                },
                 "address": {
                "street_name": address_line_1,
                "street_number": "",
                "zip_code": postal_zip_code,
            }
            },
           
            
        }
        print("-------------------------------inicio envio de preferencia ---------------------------")
        sdk = mercadopago.SDK('TEST-3267099226711187-101817-27f9bf703607cc74a1c5a4eab0d90da3-1509817892')
        preference_response = sdk.preference().create(preference_data)
        preference = preference_response["response"]
        #merchant_id = sdk.merchant_order().get()
        print(preference)
        #crear orden
        #try:
        print('------------------------------begin-order-----------------------------')
        if user.is_anonymous is False:
            
            print('------------------------------user-session-order-----------------------------')
            order.user = user
 

        print("--------------------------user-anonymous-order-----------------------------------------")
        order.amount=total_amount
        order.full_name=first_name + ' ' + last_name
        order.address_line_1=address_line_1
        order.city=city
        order.region=state_province_region
        order.postal_zip_code=postal_zip_code
        order.telephone_number=telephone_number
        order.shipping_name=shipping.name    
        order.save()       
        print('-------------------------end-order-----------------------------')

        if user.is_anonymous is False:
            cart = Carrito.objects.get(user=user)
            carrito_items = CarritoItem.objects.filter(carrito=cart)
            for cart_item in carrito_items:
                try:
                    # agarrar el producto
                    product = Product.objects.get(id=cart_item.product.id)

                    OrderItem.objects.create(
                        product=product,
                        order=order,
                        name=product.name,
                        price=cart_item.product.price,
                        )
                except:
                    return Response(
                        {'error': 'Transaction succeeded and order created, but failed to create an order item'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                        )
        else:
            print("---------agregar productos a la orden ----------")
            try:
                for num in range(0,len(products)):
                    products_dict_a=products[num]
                    producto=products_dict_a['product']
                    product = Product.objects.get(id=producto['id'])
                    OrderItem.objects.create(
                        product=product,
                        order=order,
                        name=product.name,
                        price=product.price,
                        )
            except Exception:
                print('el error es:' + str(Exception))
                return Response(
                    {'error': 'Transaction succeeded and order created, but failed to create an order item'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response({'response': preference}, status=status.HTTP_200_OK)
            

class MercadoPagoResponse(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        data = self.request.data
        sdk = mercadopago.SDK('TEST-3267099226711187-101817-27f9bf703607cc74a1c5a4eab0d90da3-1509817892')
        if(request.GET.get('id') is not None):   
            print('---------impresion orden id-----------------')
            merchant_id = sdk.merchant_order().get(request.GET.get('id'))
            print(merchant_id)
            reponse_dict= merchant_id['response']
            externalReference = reponse_dict['external_reference']
            order = Order.objects.get(id=externalReference)
            order.transaction_id = request.GET.get('id')
            order.save()
            return Response({'success': True}, status=status.HTTP_200_OK)
        else:
            paymentRef = sdk.payment().get(request.GET.get('data.id'))
            print('---------impresion pago id-----------------')
            payresponse = paymentRef['response']
            orderInfo=payresponse['order'] 
            order = Order.objects.get(transaction_id=orderInfo['id'],)
            if(payresponse['status'] == 'approved'):
                order.status = Order.OrderStatus.processed
                order.save()
                payment = Payments.objects.create(payment_id=request.GET.get('data.id'),
                                              order = order,)
                carrito = Carrito.objects.get(User=order.user)
                carritoitems = Carrito.objects.filter(carrito=carrito)
                for items in carritoitems:
                    items.delete()
                print(order)
                print('----------------------------')
                print(payment)
            elif(payresponse['status']=='failure'):
                print("fallo server1")
            elif(payresponse['status']=='rejected'):
                order.status = Order.OrderStatus.refused
                order.save()
                print("pago rechazado")
                
            elif(payresponse['status']=='no funds'):
                print("fallo server3")
            return Response({'success': True}, status=status.HTTP_200_OK)
    

class StatusPaymentView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request, format=None):
        
        return Response ({"status": order.status}, status=status.HTTP_200_OK)
