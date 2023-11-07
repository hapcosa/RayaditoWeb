from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL
from orders.countries import Countries

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address_line_1 = models.CharField(max_length=255, default='')
    city = models.CharField(max_length=255, default='')
    zipcode = models.CharField(max_length=20, default='')
    phone = models.CharField(max_length=255, default='')
    country_region = models.CharField(
        max_length=255, choices=Countries.choices, default=Countries.cero)
    
    

