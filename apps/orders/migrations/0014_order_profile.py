# Generated by Django 3.2.16 on 2023-10-30 05:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0005_alter_userprofile_user'),
        ('orders', '0013_alter_order_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='profile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='user_profile.userprofile'),
        ),
    ]
