# Generated by Django 3.2.16 on 2023-10-19 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0006_auto_20231019_1212'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='amount',
            field=models.DecimalField(decimal_places=3, max_digits=12),
        ),
    ]
