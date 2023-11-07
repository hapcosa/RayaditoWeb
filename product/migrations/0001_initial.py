# Generated by Django 3.2.16 on 2023-08-10 15:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('metaproduct', '0001_initial'),
        ('category', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('photo', models.ImageField(upload_to='photos/%y/%m')),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('compare_price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('sold', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='category.category')),
            ],
        ),
        migrations.CreateModel(
            name='Joyas',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='product.product')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=5)),
                ('material', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='metaproduct.material')),
            ],
            options={
                'verbose_name': 'Joyas',
                'verbose_name_plural': 'Joyas',
            },
            bases=('product.product',),
        ),
        migrations.CreateModel(
            name='RelationPiedraJoya',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField()),
                ('nombrePiedra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='metaproduct.nombrepiedra')),
                ('joya', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.joyas')),
            ],
            options={
                'verbose_name': 'Piedras',
                'verbose_name_plural': 'Piedras',
            },
        ),
        migrations.CreateModel(
            name='Piedras',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='product.product')),
                ('large', models.DecimalField(decimal_places=2, max_digits=5)),
                ('width', models.DecimalField(decimal_places=2, max_digits=5)),
                ('nombrePiedra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='metaproduct.nombrepiedra')),
            ],
            options={
                'verbose_name': 'Piedras',
                'verbose_name_plural': 'Piedras',
            },
            bases=('product.product',),
        ),
    ]