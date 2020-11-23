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
router.register('realtimeinfo', views.ListRealTimeInfo)


urlpatterns = [
    path('', include(router.urls)),
]
