from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .models import *
from product.models import Product
from product.serializers import ProductSerializer

class GetItemsView(APIView):
    def get(self, request, format=None):
        user=self.request.user
        try:
            cart = Carrito.objects.get(user=user)

            cart_items = CarritoItem.objects.order_by('product').filter(carrito=cart)
    
            result = []
            if CarritoItem.objects.filter(carrito=cart).exists():
                
                for cart_item in cart_items:
                    item = {}
                    item['id'] = cart_item.id
                    product = Product.objects.get(id=cart_item.product.id)
                    
                    product = ProductSerializer(product)
                   
                    item['product'] = product.data
                    result.append(item)
            return Response( {'cart' : result}, status=status.HTTP_200_OK)
        except:
            return Response( {'Error' : 'items no encontrados'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddItemView(APIView):
    def post(self, request, format=None):
        user=self.request.user
        data=self.request.data
        print(data['product_id'])
        try:
            product_id = int(data['product_id'])
        except: 
            return Response({'error':'Product ID must be an  integer'}
                            ,status=status.HTTP_404_NOT_FOUND)
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response({'error':'producto no existe'}
                            ,status=status.HTTP_404_NOT_FOUND)
            product = Product.objects.get(id=product_id)

            cart =Carrito.objects.get(user=user)

            if CarritoItem.objects.filter(carrito=cart, product=product).exists():
                return Response({'error': 'Este producto ya se ha agregado al carro de compras'},status=status.HTTP_409_CONFLICT)
            
            if (product.sold is False):
 
                try:
                    CarritoItem.objects.create(carrito=cart, product=product)
                except:
                    return Response({'error': 'ERROR'},status=status.HTTP_404_NOT_FOUND)
                if CarritoItem.objects.filter( product=product, carrito=cart).exists():
    
                    total_items = int(cart.total_items) + 1
                    print(total_items)
                    Carrito.objects.filter(user=user).update(total_items=total_items)
                    print(product)
                    cart_items = CarritoItem.objects.order_by('product').filter(carrito=cart)
                    result = []
                    for cart_item in cart_items: 
                        item ={}
                        item['id'] = cart_item.id
                        product = Product.objects.get(id=cart_item.product.id)
                        product = ProductSerializer(product)
                        item['product'] = product.data
                        result.append(item)
                        
                    return Response({'cart': result}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error':'este producto ya no esta disponible'}
                        ,status=status.HTTP_200_OK)
        except:
            print("auch1")
            return Response({'error':'este producto ya no esta disponible'}
                            ,status=status.HTTP_404_NOT_FOUND)
            
        
            
class GetTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Carrito.objects.get(user=user)
            cart_items = CarritoItem.objects.filter(carrito=cart)

            total_cost = 0.0
            total_compare_cost = 0.0

            if cart_items.exists():
                for cart_item in cart_items:
                    total_cost += (float(cart_item.product.price))
                    total_compare_cost += (float(cart_item.product.compare_price))
                total_cost = round(total_cost, 2)
                total_compare_cost = round(total_compare_cost, 2)
            return Response(
                {'total_cost': total_cost, 'total_compare_cost': total_compare_cost},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when retrieving total costs'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetItemTotalView(APIView): 
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Carrito.objects.get(user=user)
            total_items = cart.total_items

            return Response(
                {'total_items': total_items},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when getting total number of items'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateItemView(APIView):
    def put(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
        try:
            count = int(data['count'])
        except:
            return Response(
                {'error': 'Count value must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND)
            
            product = Product.objects.get(id=product_id)
            cart = Carrito.objects.get(user=user)

            if not CarritoItem.objects.filter(carrito=cart, product=product).exists():
                return Response(
                    {'error': 'This product is not in your cart'},
                    status=status.HTTP_404_NOT_FOUND)
            
         

            if count <= 1:
                CartItem.objects.filter(
                    product=product, cart=cart
                ).update(count=count)

                cart_items = CartItem.objects.order_by(
                    'product').filter(cart=cart)

                result = []

                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['count'] = cart_item.count
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

                return Response({'cart': result}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'Not enough of this item in stock'},
                    status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when updating cart item'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RemoveItemView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND)
            
            producto = Product.objects.get(id=product_id)
            cart = Carrito.objects.get(user=user)
            if not CarritoItem.objects.filter(carrito=cart, product=producto).exists():
                return Response(
                    {'error': 'This product is not in your cart'},
                    status=status.HTTP_404_NOT_FOUND)
            
            CarritoItem.objects.filter(carrito=cart, product=producto).delete()

            if not CarritoItem.objects.filter(carrito=cart, product=producto).exists():
                # actualizar numero total en el carrito
                total_items = int(cart.total_items) - 1
                Carrito.objects.filter(user=user).update(total_items=total_items)

            cart_items = CarritoItem.objects.order_by('product').filter(carrito=cart)

            result = []

            if CarritoItem.objects.filter(carrito=cart).exists():
                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    producto = Product.objects.get(id=cart_item.product.id)
                    producto = ProductSerializer(producto)

                    item['product'] = producto.data

                    result.append(item)

            return Response({'cart': result}, status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when removing item'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EmptyCartView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            cart = Carrito.objects.get(user=user)

            if not CarritoItem.objects.filter(carrito=cart).exists():
                return Response(
                    {'success': 'Cart is already empty'},
                    status=status.HTTP_200_OK)

            CarritoItem.objects.filter(carrito=cart).delete()

            # Actualizamos carrito
            Carrito.objects.filter(user=user).update(total_items=0)

            return Response(
                {'success': 'Cart emptied successfully'},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong emptying cart'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SynchCartView(APIView):
    def put(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            cart_items = data['cart_items']

            for cart_item in cart_items:
                cart = Carrito.objects.get(user=user)

                try:
                    product_id = int(cart_item['product_id'])
                except:
                    return Response(
                        {'error': 'Product ID must be an integer'},
                        status=status.HTTP_404_NOT_FOUND)

                if not Product.objects.filter(id=product_id).exists():
                    return Response(
                        {'error': 'Product with this ID does not exist'},
                        status=status.HTTP_404_NOT_FOUND)

                product = Product.objects.get(id=product_id)
                sold = product.sold

                if CarritoItem.objects.filter(carrito=cart, product=product).exists():
                    # Actualiizamos el item del carrito
                    item = CarritoItem.objects.get(carrito=cart, product=product)

                    #Chqueo con base de datos
                    if sold:
                        updated_count = cart_item_count + int(count)
                        CarritoItem.objects.filter(
                            carrito=cart, product=product
                        ).update(count=updated_count)
                else:
                    #Agregar el item al carrito del usuario
                    try:
                        cart_item_count = int(cart_item['count'])
                    except:
                        cart_item_count = 1

                    if cart_item_count <= quantity:
                        CartItem.objects.create(
                            product=product, cart=cart, count=cart_item_count
                        )

                        if CartItem.objects.filter(cart=cart, product=product).exists():
                            #Sumar item
                            total_items = int(cart.total_items) + 1
                            Cart.objects.filter(user=user).update(
                                total_items=total_items
                            )

                return Response(
                {'success': 'Cart Synchronized'},
                status=status.HTTP_201_CREATED)
        except:
            return Response(
                {'error': 'Something went wrong when synching cart'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)