from rest_framework_jwt.views import obtain_jwt_token,  refresh_jwt_token, verify_jwt_token
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import LoginAPI, UserAPI, Regist, RegistrationAPI,WithdrawAPI, UpdateAPI


router = DefaultRouter()
router.register('user', views.UserAPI)

urlpatterns = [
    path('', include(router.urls)),

    path('api-jwt-auth', obtain_jwt_token),
    path('refresh-jwt-auth', refresh_jwt_token),
    path('verify-jwt-auth', verify_jwt_token),
    path('login', views.LoginAPI.as_view()),
    path('registeruser', views.RegistrationAPI.as_view()),
    path('register', views.Regist),
    path('withdraw', views.WithdrawAPI),
    path('update', views.UpdateAPI),
]