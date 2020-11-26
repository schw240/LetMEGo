from rest_framework_jwt.views import obtain_jwt_token,  refresh_jwt_token, verify_jwt_token
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import UserAPI, Regist, WithdrawAPI, UpdateAPI, UserInfoAPI, LoginAPI, DeleteUserAPI


router = DefaultRouter()
router.register('user', views.UserAPI)

urlpatterns = [
    path('', include(router.urls)),

    path('api-jwt-auth', obtain_jwt_token),
    path('refresh-jwt-auth', refresh_jwt_token),
    path('verify-jwt-auth', verify_jwt_token),
    path('login', views.LoginAPI),
    path('register', views.Regist),
    path('withdraw', views.WithdrawAPI),
    path('update', views.UpdateAPI),
    path('userinfo', views.UserInfoAPI),
    path('deleteuser', views.DeleteUserAPI),
]