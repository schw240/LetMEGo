from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('banklist', views.ListBank)
router.register('bankgroup_list', views.ListBankGroupInfo)
router.register('foreignbank', views.ListForeignBank)
router.register('navernews', views.ListNaverNews)
router.register('bankinfo', views.ListBankInfo)
router.register('countryinfo', views.ListCountryInfo)


urlpatterns = [
    path('', include(router.urls)),
    # path('', views.ListBank.as_view()),
    # path('<int:pk>/', views.DetailBank.as_view()),
    # path('', views.ListBankInfo.as_view()),
    # path('<int:pk>/', views.DetailBankInfo.as_view()),
    # path('', views.ListForeignBank.as_view()),
    # path('<int:pk>/', views.DetailForeignBank.as_view()),
]
