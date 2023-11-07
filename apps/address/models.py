from django.db import models
from apps.product.models import Product
from .region import Region
from datetime import datetime
from django.contrib.auth import get_user_model
User = get_user_model()

class Adress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    address_line_1 = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    region = models.CharField(
        max_length=255, choices=Region.choices, default=Region.cero)
    postal_zip_code = models.CharField(max_length=20)