from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from .models import Category


class ListCategoriesJoyasView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        if Category.objects.filter(ProductType="Joya").exists():
            categories = Category.objects.filter(ProductType="Joya")

            result = []

            for category in categories:
                if not category.parent:
                    item = {}
                    item['id'] = category.id
                    item['name'] = category.name
                    
                    item['sub_categories'] = []
                    for cat in categories:
                        sub_item = {}
                        if cat.parent and cat.parent.id == category.id:
                            sub_item['id'] = cat.id
                            sub_item['name'] = cat.name
                            sub_item['sub_categories'] = []

                            item['sub_categories'].append(sub_item)
                    result.append(item)
            return Response ({'categories': result},status=status.HTTP_200_OK)
        else:
            return Response ({'error': 'no se encuentran categorias'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class ListCategoriesPiedrasView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        if Category.objects.filter(ProductType="Piedra").exists():
            categories = Category.objects.filter(ProductType="Piedra")

            result = []

            for category in categories:
                if not category.parent:
                    item = {}
                    item['id'] = category.id
                    item['name'] = category.name
                    
                    item['sub_categories'] = []
                    for cat in categories:
                        sub_item = {}
                        if cat.parent and cat.parent.id == category.id:
                            sub_item['id'] = cat.id
                            sub_item['name'] = cat.name
                            sub_item['sub_categories'] = []

                            item['sub_categories'].append(sub_item)
                    result.append(item)
            return Response ({'categories': result},status=status.HTTP_200_OK)
        else:
            return Response ({'error': 'no se encuentran categorias'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)