from django.urls import path
from .views import *

urlpatterns = [
    path('categories', ListCategoriesJoyasView.as_view()),
    path('piedrascategory', ListCategoriesPiedrasView.as_view()), 
]
