from django.db import models
from apps.product.models import Product
from .countries import Countries
from datetime import datetime
from django.contrib.auth import get_user_model
from apps.user_profile.models import UserProfile
User = get_user_model()


class Order(models.Model):
    class OrderStatus(models.TextChoices):
        not_processed = 'no procesado'
        processed = 'procesado'
        shipping = 'enviado'
        cancelled = 'cancelado'
        refused = 'rechazado'
        
    
    status = models.CharField(
        max_length=50, choices=OrderStatus.choices, default=OrderStatus.not_processed)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    transaction_id = models.CharField(max_length=255, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=3, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    address_line_1 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    postal_zip_code = models.CharField(max_length=20, blank=True)
    region = models.CharField(
        max_length=255, choices=Countries.choices, default=Countries.cero, blank=True)
    telephone_number = models.CharField(max_length=255, blank=True)
    shipping_name = models.CharField(max_length=255, blank=True)
    date_issued = models.DateTimeField(auto_now_add=datetime.now)
    profile = models.ForeignKey(UserProfile, on_delete=models.DO_NOTHING, null=True )


    def __str__(self):
        return str(self.transaction_id)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    date_added = models.DateTimeField(auto_now_add=datetime.now)

    def __str__(self):
        return str(self.product)