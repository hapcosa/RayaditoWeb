from django.contrib import admin
from .models import Product, Joyas, Piedras, GalleryProduct

class JoyasAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'compare_price', 'price', 'sold',)
    list_display_links=('id', 'name',)
    list_filter = ('category',)
    list_editable = ('compare_price','price', 'sold',)
    list_per_page = 25
class PiedrasAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'compare_price', 'price', 'sold',)
    list_display_links=('id', 'name',)
    list_filter = ('category',)
    list_editable = ('compare_price','price', 'sold',)
    list_per_page = 25
class Galleryproducts(admin.ModelAdmin):
    list_display =('id', 'product')
    list_display_links=('id', 'product')
    list_filter =('product',)
    list_per_page = 25
admin.site.register(Joyas, JoyasAdmin)
admin.site.register(Piedras, PiedrasAdmin)
admin.site.register(GalleryProduct, Galleryproducts)
