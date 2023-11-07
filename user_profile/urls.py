from django.urls import path
from .views import GetUserProfileView, UpdateUserProfileView, DeleteUserProfileView, CreateUserProfileView

urlpatterns = [
    path('user', GetUserProfileView.as_view()),
    path('update', UpdateUserProfileView.as_view()),
    path('delete', DeleteUserProfileView.as_view()),
    path('create', CreateUserProfileView.as_view()),
]
