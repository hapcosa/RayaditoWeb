from django.db import models
from product.models import Product
from django.conf import settings
User = settings.AUTH_USER_MODEL
class Carrito(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_items = models.IntegerField(default=0)
class CarritoItem(models.Model):
    carrito= models.ForeignKey(Carrito, on_delete=models.CASCADE)
    product= models.ForeignKey(Product, on_delete=models.CASCADE)
    
