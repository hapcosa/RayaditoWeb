# Generated by Django 3.2.16 on 2023-10-29 02:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0013_alter_order_user'),
        ('payment', '0002_auto_20231026_1146'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payments',
            name='order',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='orders.order'),
        ),
    ]
