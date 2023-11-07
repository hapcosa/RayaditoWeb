from django.db import models
from orders.models import Order
# Create your models here.

class Payments(models.Model):
    payment_id = models.IntegerField(unique=True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, unique=True)
    typepayment = models.CharField(max_length=255, null=True, blank=True)
    cuotas= models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.payment_id) + " order:" + str(self.order)
    

    
