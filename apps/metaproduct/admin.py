from django.contrib import admin
from .models import *
# Register your models here.
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('id','name','cost')
    list_display_links= ('id','name','cost')
    list_per_page = 25
    
class NombrePiedraAdmin(admin.ModelAdmin):
    list_display = ('id','name',)
    list_display_links= ('id','name',)
    list_per_page = 25

admin.site.register(Material, MaterialAdmin)

admin.site.register(NombrePiedra, NombrePiedraAdmin)