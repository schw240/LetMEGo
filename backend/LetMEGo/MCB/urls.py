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
router.register('xgboost_usd', views.ListXGBoostUSD)
router.register('xgboost_yen', views.ListXGBoostYEN)
router.register('xgboost_euro', views.ListXGBoostEURO)
router.register('lstm_usd', views.ListLSTMUSDInfo)
router.register('lstm_yen', views.ListLSTMYENInfo)
router.register('lstm_euro', views.ListLSTMEUROInfo)

urlpatterns = [
    path('', include(router.urls)),

    # 메인페이지 환율 계산 가장 싼 값(buy)
    path('mostcheapbuy/<country_name>', views.MostCheapBuy),
    path('wordcloud', views.Wordcloud),
]
