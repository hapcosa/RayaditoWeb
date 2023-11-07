from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from  .models import Joyas, Product, Piedras, GalleryProduct, RelationPiedraJoya
from .serializers import JoyasSerializer, PiedrasSerializer, GalleryProductSerializer, RelationPiedraJoyaSerializer, ProductSerializer
from category.models import Category
from metaproduct.models import *
from django.db.models import Q
# Create your views here.
#piedras api views
class ListPiedrasView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        sortBy = request.query_params.get('sortBy')

        if not (sortBy == 'date_created' or sortBy == 'price' or sortBy == 'name'):
            sortBy = 'date_created'
        
        order = request.query_params.get('order')
        limit = request.query_params.get('limit')

        if not limit:
            limit = 6
        
        try:
            limit = int(limit)
        except:
            return Response(
                {'error': 'limite debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND)
        
        if limit <= 0:
            limit = 6
        
        if order == 'desc':
            sortBy = '-' + sortBy
            piedras = Piedras.objects.order_by(sortBy).filter(sold=False)[:int(limit)]
        elif order == 'asc':
            piedras = Piedras.objects.order_by(sortBy).filter(sold=False)[:int(limit)]
        else:
            piedras = Piedras.objects.order_by(sortBy).filter(sold=False)

        
        piedras = PiedrasSerializer(piedras, many=True)
        if piedras:
            return Response({'piedras': piedras.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No Piedras to list'},
                status=status.HTTP_404_NOT_FOUND)
class PiedrasListSearchView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format = None):
        data = self.request.data
        try:
            category_id = int(data['category_id'])
        except:
             return Response({'error': 'categoriy_id debe ser un numero entero'},status=status.HTTP_404_NOT_FOUND)
        search = data['search']
        if len(search)== 0:
            search_results=Piedras.objects.order_by('-date_created').all()
        else:
            search_results=Piedras.objects.filter(Q(description__icontains=search) |Q(name__icontains=search))
        if category_id == 0:
            search_results = PiedrasSerializer(search_results, many=True)
            return Response( {'search_results': search_results.data},status=status.HTTP_200_OK)
        if not Category.objects.filter(id=category_id, sold=False).exists():
            return Response({'error':'categoria no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        category = Category.objects.get(id=category_id)
        if category.parent:
            search_results = search_results.order_by('-date_created').filter(category=category)
        else:
            if not Category.objects.filter(iparent=category).exists():
                search_results = search_results.order_by('-date_created').filter(category=category)
            else:
                categories =  Category.objects.filter(parent=category, ProductType=Piedra)
                filtered_categories = [category]
                for cat in categories:
                    filtered_categories.append(cat)
                filtered_categories=tuple(filtered_categories)
                search_results = search_results.order_by('-date_created').filter(category__in=filtered_categories)
        search_results = PiedrasSerializer(search_results, many=True)
        return Response({'search_products': search_results.data}, status=status.HTTP_200_OK)
class PiedrasDetailView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, productId, format = None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID debe ser un numero entero'},
                status=status.HTTP_400_NOT_FOUND
            )
        if Piedras.objects.filter(id=product_id).exists():
            piedra = Piedras.objects.get(id=product_id)
            piedra = PiedrasSerializer(piedra)
            return Response({'piedra': piedra.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'el producto no existe'},
                status=status.HTTP_404_NOT_FOUND)
class PiedrasListRelatedView(APIView):
    permission_classes = (permissions.AllowAny)
    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'La Id debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND)
        if not Piedras.objects.filter(id=product_id).exists():
            return Response(
                {'error': 'La Id de este producto no existe'},
                status=status.HTTP_404_NOT_FOUND)
        category = Piedras.objects.get(id=product_id).category
        if Piedras.objects.filter(category=category).exists():
            if category.parent:
                related_products = Piedras.objects.order_by('-sold').filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_products = related_products.order_by('-sold').filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]
                    for cat in categories:
                        filtered_categories.append(cat)
                    filtered_categories = tuple(filtered_categories)
                    related_products = related_products.order_by('-sold').filter(category__in=filtered_categories)
            related_products = related_products.exclude(id=product_id)
            related_products = PiedrasSerializer(related_products, many=True)
            
            if len(related_products) > 3:
                return Response(
                    {'related_products': related_products.data[:3]},
                     status.status.HTTP_200_OK)
            elif len(related_products) > 0:
                return Response(
                    {'related_products': related_products.data},
                     status.status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'no hay productos relacionados'},
                     status.status.HTTP_200_OK)
class PiedrasListBySearchView(APIView):
    permission_classes=(permissions.AllowAny,)
    def post(self, request, format=None):
        data=self.request.data
        try:
            category_id = int(data['category_id'])
        except:
             return Response(
                {'error': 'La Id debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND)
        price_range = data['price_range']
        sortBy = data['sortBy']
        if not ( sortBy == 'date_created' or sortBy == 'price' or sortBy == 'name'):
            sortBy= 'date_created'
        order = data['order']
        if category_id == 0:
            products_results = Piedras.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'La categoria no existe'},
                status=status.HTTP_404_NOT_FOUND)
            
        else:
            category = Category.objects.get(id=category_id)
            if category.parent:
                products_results = Piedras.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    products_results = Piedras.objects.filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]
                    for cat in categories:
                        filtered_categories.append(cat)
                    filtered_categories = tuple(filtered_categories)
                    products_results = Piedras.objects.filter(category__in=filtered_categories)
        # filtrar por precio
        if price_range == '0 - 1999':
            products_results = products_results.filter(price__gte=0000)
            products_results = products_results.filter(price__lt=2000)
        elif price_range =='20000 - 3999':
            products_results = products_results.filter(price__gte=2000)
            products_results = products_results.filter(price__lt=4000)
        elif price_range =='4000 - 5999':
            products_results = products_results.filter(price__gte=4000)
            products_results = products_results.filter(price__lt=6000)
        elif price_range =='60000 - 11999':
            products_results = products_results.filter(price__gte=6000)
            products_results = products_results.filter(price__lt=12000)
        elif price_range =='12000 -19999':
            products_results = products_results.filter(price__gte=12000)
            products_results = products_results.filter(price__lt=20000)
        elif price_range == 'mayor a 20000':
            products_results = products_results.filter(price__gte=20000)
        else:
            products_results = products_results.filter(price__gte=0)
        if order == 'desc':
            sortBy = '-' + sortBy
            products_results = products_results.order_by(sortBy)
        elif order == 'asc':
            products_results = products_results.order_by(sortBy)
        else:
            products_results = products_results.order_by(sortBy)
            
        products_results = PiedrasSerializer(products_results, many=True)
        if len(products_results.data) > 0:
            return Response({'filtered_products': products_results.data}, status=status.HTTP_200_OK)
        else:
              return Response(
                {'error': 'los productos no existen'},
                status=status.HTTP_404_NOT_FOUND)

#----------------------------------------------------------------
#Joyas api views
class ListJoyasView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format = None):
        sortBy = request.query_params.get('sortBy')
        if not ( sortBy == 'date_created' or sortBy == 'price' or sortBy == 'name'):
            sortBy= 'date_created'
        order =request.query_params.get('order')
        limit = request.query_params.get('limit')
        if not limit:
            limit = 6 
        try:
             limit = int(limit)
        except:
            return Response(
                {'error':'limite debe ser un numero entero'},
                status=status.HTTP_404_NOT_FOUND
        
            )
        if limit <= 0:
            limit = 6
        if order == 'desc':
            sortBy = '-' + sortBy
            joyas = Joyas.objects.order_by(sortBy).filter(sold=False)[:int(limit)]
        elif order == 'asc':
            joyas = Joyas.objects.order_by(sortBy).filter(sold=False)[:int(limit)]
        else:
            joyas = Joyas.objects.order_by(sortBy).filter(sold=False)
            
        joyas = JoyasSerializer(joyas, many=True)
        if joyas:
            return Response({'joyas': joyas.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'no products to list'},status=status.HTTP_404_NOT_FOUND)
class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format = None):
        data = self.request.data
        try:
            category_id = int(data['category_id'])
        except:
             return Response({'error': 'categoriy_id debe ser un numero entero'},status=status.HTTP_404_NOT_FOUND)
        search = data['search']
        if len(search)== 0:
            search_results=Joyas.objects.order_by('-date_created').all()
        else:
            search_results=Joyas.objects.filter(Q(description__icontains=search) | Q(name__icontains=search))
        if category_id == 0:
            search_results = JoyasSerializer(search_results, many=True)
            return Response( {'search_results': search_results.data},status=status.HTTP_200_OK)
        if not Category.objects.filter(id=category_id).exists():
            return Response({'error':'categoria no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        category = Category.objects.get(id=category_id)
        if category.parent:
            search_results = search_results.order_by('-date_created').filter(category=category)
        else:
            if not Category.objects.filter(parent=category).exists():
                search_results = search_results.order_by('-date_created').filter(category=category)
            else:
                categories =  Category.objects.filter(parent=category)
                filtered_categories = [category]
                for cat in categories:
                    filtered_categories.append(cat)
                filtered_categories=tuple(filtered_categories)
                search_results = search_results.order_by('-date_created').filter(category__in=filtered_categories)
        search_results = JoyasSerializer(search_results, many=True)
        return Response({'search_products': search_results.data}, status=status.HTTP_200_OK)         
class JoyasDetailView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, productId, format = None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID debe ser un numero entero'},
                status=status.HTTP_400_NOT_FOUND
            )
        if Joyas.objects.filter(id=product_id).exists():
            joya = Joyas.objects.get(id=product_id)
            joya = JoyasSerializer(joya)
            return Response({'joya': joya.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'el producto no existe'},
                status=status.HTTP_404_NOT_FOUND)
class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny)
    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'La Id debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND)
        if not Joyas.objects.filter(id=product_id).exists():
            return Response(
                {'error': 'La Id de este producto no existe'},
                status=status.HTTP_404_NOT_FOUND)
        category = Joyas.objects.get(id=product_id).category
        if Joyas.objects.filter(category=category).exists():
            if category.parent:
                related_products = Joyas.objects.order_by('date_created').filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_products = related_products.order_by('date_created').filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]
                    for cat in categories:
                        filtered_categories.append(cat)
                    filtered_categories = tuple(filtered_categories)
                    related_products = related_products.order_by('date_created').filter(category__in=filtered_categories)
            related_products = related_products.exclude(id=product_id)
            related_products = JoyasSerializer(related_products, many=True)
            
            if len(related_products) > 3:
                return Response(
                    {'related_products': related_products.data[:3]},
                     status.status.HTTP_200_OK)
            elif len(related_products) > 0:
                return Response(
                    {'related_products': related_products.data},
                     status.status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'no hay productos relacionados'},
                     status.status.HTTP_200_OK)
class ListBySearchView(APIView):
    permission_classes=(permissions.AllowAny,)
    def post(self, request, format=None):
        data=self.request.data
        try:
            category_id = int(data['category_id'])
        except:
             return Response(
                {'error': 'La Id debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND)
        price_range = data['price_range']
        sortBy = data['sortBy']
        if not ( sortBy == 'date_created' or sortBy == 'price' or sortBy == 'name'):
            sortBy= 'date_created'
        order = data['order']
        if category_id == 0:
            products_results = Joyas.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'La categoria no existe'},
                status=status.HTTP_404_NOT_FOUND)
            
        else:
            category = Category.objects.get(id=category_id)
            if category.parent:
                products_results = Joyas.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    products_results = Joyas.objects.filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]
                    for cat in categories:
                        filtered_categories.append(cat)
                    filtered_categories = tuple(filtered_categories)
                    products_results = Joyas.objects.filter(category__in=filtered_categories)
        # filtrar por precio
        if price_range == '0 - 19999':
            products_results = products_results.filter(price__gte=0000)
            products_results = products_results.filter(price__lt=20000)
        elif price_range =='20000 - 39999':
            products_results = products_results.filter(price__gte=20000)
            products_results = products_results.filter(price__lt=40000)
        elif price_range =='40000 - 59999':
            products_results = products_results.filter(price__gte=40000)
            products_results = products_results.filter(price__lt=60000)
        elif price_range =='60000 - 79999':
            products_results = products_results.filter(price__gte=60000)
            products_results = products_results.filter(price__lt=80000)
        elif price_range =='80000 - 99999':
            products_results = products_results.filter(price__gte=80000)
            products_results = products_results.filter(price__lt=100000)
        elif price_range == 'mayor a 100000':
            products_results = products_results.filter(price__gte=100000)
        else:
            products_results = products_results.filter(price__gte=0)
        if order == 'desc':
            sortBy = '-' + sortBy
            products_results = products_results.order_by(sortBy)
        elif order == 'asc':
            products_results = products_results.order_by(sortBy)
        else:
            products_results = products_results.order_by(sortBy)
            
        products_results = JoyasSerializer(products_results, many=True)
        if len(products_results.data) > 0:
            return Response({'filtered_products': products_results.data}, status=status.HTTP_200_OK)
        else:
              return Response(
                {'error': 'los productos no existen'},
                status=status.HTTP_404_NOT_FOUND)
class ListPiedraJoya(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, productId, format = None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID debe ser un numero entero'},
                status=status.HTTP_400_NOT_FOUND
            )
        if RelationPiedraJoya.objects.filter(product=product_id).exists():
            relationpiedrajoya = RelationPiedraJoya.objects.filter(product=product_id)
            relationpiedrajoya = RelationPiedraJoyaSerializer(relationpiedrajoya, many=True)
            return Response({'piedrajoya': relationpiedrajoya.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'el producto no existe'},
                status=status.HTTP_404_NOT_FOUND)
#----------------------------------------------------------------
# Product api views                    
            
class ListAllSearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        search = data['search']

        # Chequear si algo input ocurrio en la busqueda
        if len(search) == 0:
            # mostrar todos los productos si no hay input en la busqueda
            search_results = Product.objects.order_by('-date_created').all()
        else:
            # Si hay criterio de busqueda, filtramos con dicho criterio usando Q
            search_results = Product.objects.filter(
                Q(description__icontains=search) | Q(name__icontains=search)
            )

        if category_id == 0:
            search_results = ProductSerializer(search_results, many=True)
            return Response(
                {'search_products': search_results.data},
                status=status.HTTP_200_OK)
        

        # revisar si existe categoria
        if not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Category not found'},
                status=status.HTTP_404_NOT_FOUND)

        category = Category.objects.get(id=category_id)

        # si la categoria tiene apdre, fitlrar solo por la categoria y no el padre tambien
        if category.parent:
            search_results = search_results.order_by(
                '-date_created'
            ).filter(category=category)
        
        else:
            # si esta categoria padre no tiene hijjos, filtrar solo la categoria
            if not Category.objects.filter(parent=category).exists():
                search_results = search_results.order_by(
                    '-date_created'
                ).filter(category=category)
        
            else:
                categories = Category.objects.filter(parent=category)
                filtered_categories = [category]

                for cat in categories:
                    filtered_categories.append(cat)
                
                filtered_categories = tuple(filtered_categories)

                search_results = search_results.order_by(
                    '-date_created'
                ).filter(category__in=filtered_categories)
        
        search_results = ProductSerializer(search_results, many=True)
        return Response({'search_products': search_results.data}, status=status.HTTP_200_OK)
class ListGalleryView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, productId, format = None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID debe ser un numero entero'},
                status=status.HTTP_400_NOT_FOUND
            )
        if GalleryProduct.objects.filter(product=product_id).exists():
            galleryProduct = GalleryProduct.objects.filter(product=product_id)
            galleryProduct = GalleryProductSerializer(galleryProduct, many=True)
            return Response({'gallery': galleryProduct.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'el producto no existe'},
                status=status.HTTP_404_NOT_FOUND)
class ListALlBySearchView(APIView):
    permission_classes=(permissions.AllowAny,)
    def post(self, request, format=None):
        data=self.request.data
        try:
            category_id = int(data['category_id'])
        except:
             return Response(
                {'error': 'La Id debe ser un entero'},
                status=status.HTTP_404_NOT_FOUND)
        price_range = data['price_range']
        sortBy = data['sortBy']
        if not ( sortBy == 'date_created' or sortBy == 'price' or sortBy == 'name'):
            sortBy= 'date_created'
        order = data['order']
        if category_id == 0:
            products_results = Product.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'La categoria no existe'},
                status=status.HTTP_404_NOT_FOUND)
            
        else:
            category = Category.objects.get(id=category_id)
            if category.parent:
                products_results = Product.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    products_results = Product.objects.filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]
                    for cat in categories:
                        filtered_categories.append(cat)
                    filtered_categories = tuple(filtered_categories)
                    products_results = Product.objects.filter(category__in=filtered_categories)
        # filtrar por precio
        if price_range == '0 - 19999':
            products_results = products_results.filter(price__gte=0000)
            products_results = products_results.filter(price__lt=20000)
        elif price_range =='20000 - 39999':
            products_results = products_results.filter(price__gte=20000)
            products_results = products_results.filter(price__lt=40000)
        elif price_range =='40000 - 59999':
            products_results = products_results.filter(price__gte=40000)
            products_results = products_results.filter(price__lt=60000)
        elif price_range =='60000 - 79999':
            products_results = products_results.filter(price__gte=60000)
            products_results = products_results.filter(price__lt=80000)
        elif price_range =='80000 - 99999':
            products_results = products_results.filter(price__gte=80000)
            products_results = products_results.filter(price__lt=100000)
        elif price_range == 'mayor a 100000':
            products_results = products_results.filter(price__gte=100000)
        
        if order == 'desc':
            sortBy = '-' + sortBy
            products_results = products_results.order_by(sortBy)
        elif order == 'asc':
            products_results = products_results.order_by(sortBy)
        else:
            products_results = products_results.order_by(sortBy)
            
        products_results = ProductSerializer(products_results, many=True)
        if len(products_results.data) > 0:
            return Response({'filtered_products': products_results.data}, status=status.HTTP_200_OK)
        else:
              return Response(
                {'error': 'los productos no existen'},
                status=status.HTTP_404_NOT_FOUND)                