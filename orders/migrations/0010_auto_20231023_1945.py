# Generated by Django 3.2.16 on 2023-10-23 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_auto_20231019_2252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='address_line_1',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='order',
            name='amount',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=12),
        ),
        migrations.AlterField(
            model_name='order',
            name='city',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='order',
            name='full_name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='order',
            name='postal_zip_code',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='order',
            name='region',
            field=models.CharField(blank=True, choices=[('...', 'Cero'), ('Arica y Parinacota', 'Uno'), ('Tarapaca', 'Dos'), ('Antofagasta', 'Tres'), ('Atacama', 'Cuatro'), ('Coquimbo', 'Cinco'), ('Valparaiso', 'Seis'), ('Metropolitana', 'Siete'), ('O`higgins', 'Ocho'), ('Maule', 'Nueve'), ('Ñuble', 'Diez'), ('Biobío', 'Once'), ('La Araucania', 'Doce'), ('Los Rios', 'Trece'), ('Los Lagos', 'Catorce'), ('Aysén', 'Quince'), ('Magallanes', 'Dieciseis')], default='...', max_length=255),
        ),
        migrations.AlterField(
            model_name='order',
            name='shipping_name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('no procesado', 'Not Processed'), ('procesado', 'Processed'), ('enviado', 'Shipping'), ('cancelado', 'Cancelled'), ('rechazado', 'Refused')], default='no procesado', max_length=50),
        ),
        migrations.AlterField(
            model_name='order',
            name='telephone_number',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]