from django.db import models
Origen = (
    ('Volcanico','VOLCANICO'),
    ('Sedimentario','SEDIMENTARIO'),
    ('Metamorfico','METAMORFICO')
)
# Create your models here.
class Material(models.Model):
    name = models.CharField(max_length=255)
    cost = models.DecimalField(max_digits=7, decimal_places=2)
    def __str__(self):
        return self.name
class NombrePiedra(models.Model):
    class Meta:
        verbose_name = 'PiedraTipo'
        verbose_name_plural = 'Tipos de piedra'
    name = models.CharField(max_length=255)
    mohs = models.DecimalField(max_digits=7, decimal_places=3)
    origen = models.CharField(choices=Origen, max_length=55)
    def __str__(self):
        return self.name
