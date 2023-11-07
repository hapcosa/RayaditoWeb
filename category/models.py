from django.db import models
ProductType =(
    ('Piedra','PIEDRA'),
    ('Joya','JOYA'),
)
# Create your models here.
class  Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255, unique=True)
    ProductType = models.CharField(choices=ProductType, max_length=55)
    def __str__(self):
        return self.name
