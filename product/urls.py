from django.urls import path
from .views import *
app_name = 'product'

urlpatterns = [
    path('piedras/<productId>', PiedrasDetailView.as_view()),
    path('get-piedras', ListPiedrasView.as_view()),
    path('search-piedras',  PiedrasListSearchView.as_view()),
    path('related-piedras/<productId>', PiedrasListRelatedView.as_view()), 
    path('joyas/<productId>', JoyasDetailView.as_view()), 
    path('get-joyas', ListJoyasView.as_view()),
    path('search-joyas',  ListSearchView.as_view()),
    path('search',  ListAllSearchView.as_view()),
    path('related-joyas/<product_id>', ListRelatedView.as_view()), 
    path('by/search', ListBySearchView.as_view()),
    path('piedras/by/search', PiedrasListBySearchView.as_view()),
    path('galeryproduct/<productId>', ListGalleryView.as_view()),
    path('search',  ListAllSearchView.as_view()),
    path('by/search', ListALlBySearchView.as_view()),
]
