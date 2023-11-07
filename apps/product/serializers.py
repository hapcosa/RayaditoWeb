from rest_framework import serializers
from .models import Product, Joyas, Piedras, GalleryProduct

class JoyasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Joyas
        fields = '__all__'
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields = '__all__'
class PiedrasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Piedras
        fields = '__all__'
class GalleryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=GalleryProduct
        fields = '__all__'
class RelationPiedraJoyaSerializer(serializers.ModelSerializer):
    class Meta:
        model=GalleryProduct
        fields = '__all__'