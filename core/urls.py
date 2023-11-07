from django.contrib import admin
from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.conf import settings
from .views import Error404View
urlpatterns = [
    path("auth/", include('djoser.urls')),
    path("auth/", include('djoser.urls.jwt')),
    path("auth/", include('djoser.social.urls')),
    path('api/category/', include('category.urls')),
    path('api/product/', include('product.urls')),
    path('api/cart/', include('carrito.urls')),
    path('api/shipp/', include('shipping.urls')),
    path('api/profile/', include('user_profile.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/payment/', include('payment.urls')),
    path("admin/", admin.site.urls),
] + static( settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]