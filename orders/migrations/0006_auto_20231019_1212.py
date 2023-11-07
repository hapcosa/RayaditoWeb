# Generated by Django 3.2.16 on 2023-10-19 12:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0005_auto_20230929_0224'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='shipping_time',
        ),
        migrations.AlterField(
            model_name='order',
            name='region',
            field=models.CharField(choices=[('...', 'Cero'), ('Arica y Parinacota', 'Uno'), ('Tarapaca', 'Dos'), ('Antofagasta', 'Tres'), ('Atacama', 'Cuatro'), ('Coquimbo', 'Cinco'), ('Valparaiso', 'Seis'), ('Metropolitana', 'Siete'), ('O`higgins', 'Ocho'), ('Maule', 'Nueve'), ('Ñuble', 'Diez'), ('Biobío', 'Once'), ('La Araucania', 'Doce'), ('Los Rios', 'Trece'), ('Los Lagos', 'Catorce'), ('Aysén', 'Quince'), ('Magallanes', 'Dieciseis')], default='...', max_length=255),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('no procesado', 'Not Processed'), ('procesado', 'Processed'), ('enviado', 'Shipping'), ('delivered', 'Delivered'), ('cancelado', 'Cancelled'), ('rechazado', 'Refused')], default='no procesado', max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]