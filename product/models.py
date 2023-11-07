from django.db import models
from datetime import datetime
from category.models import Category
from metaproduct.models import *

class Product(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='photos/%y/%m')
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=0)
    compare_price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    sold = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=datetime.now)
    
    def __str__(self):
        return self.name
    
class Joyas(Product):
    class Meta:
        verbose_name = 'Joyas'
        verbose_name_plural = 'Joyas'
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    
class Piedras(Product):
    class Meta:
        verbose_name = 'Piedras'
        verbose_name_plural = 'Piedras'
    large = models.DecimalField(max_digits=5, decimal_places=2)
    width = models.DecimalField(max_digits=5, decimal_places=2)
    nombrePiedra = models.ForeignKey(NombrePiedra, on_delete=models.CASCADE)

#clases relacionales muchos a muchos o muchos  a uno
class RelationPiedraJoya(models.Model):
    class Meta:
        verbose_name = 'Piedrasin'
        verbose_name_plural = 'Piedrasin'
    nombrePiedra = models.ForeignKey(NombrePiedra, on_delete=models.CASCADE)
    joya = models.ForeignKey(Joyas, on_delete=models.CASCADE)
    cantidad = models.IntegerField()

class GalleryProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    photos = models.ImageField(upload_to='photos/%y/%m')
class JoyaMateriales(models.Model):
    joya = models.ForeignKey(Joyas , on_delete=models.CASCADE)
    material = models.ForeignKey(Material, on_delete=models.CASCADE)