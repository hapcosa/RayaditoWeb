# Generated by Django 3.2.16 on 2023-10-26 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payments',
            name='merchant_id',
        ),
        migrations.AddField(
            model_name='payments',
            name='cuotas',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='payments',
            name='typepayment',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
