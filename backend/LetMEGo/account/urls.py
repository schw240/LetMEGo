from rest_framework_jwt.views import obtain_jwt_token,  refresh_jwt_token, verify_jwt_token
from django.urls import path
from . import views
from .views import LoginAPI, UserAPI, Regist, RegistrationAPI



urlpatterns = [

    path('api-jwt-auth', obtain_jwt_token),
    path('refresh-jwt-auth', refresh_jwt_token),
    path('verify-jwt-auth', verify_jwt_token),
    path('login', views.LoginAPI.as_view()),
    path('user', views.UserAPI.as_view()),
    path('registeruser', views.RegistrationAPI.as_view()),
    path('register', views.Regist),
]