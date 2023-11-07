from django.urls import path
from .views import ProcessPaymentView, MercadoPagoResponse, StatusPaymentView
from django.views.decorators.csrf import csrf_exempt
app_name="payment"

urlpatterns = [
    path('make-payment', ProcessPaymentView.as_view()),
    path('webhook',  csrf_exempt(MercadoPagoResponse.as_view())),
    path('status-payment', StatusPaymentView.as_view())
]