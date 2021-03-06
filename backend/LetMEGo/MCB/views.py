from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, viewsets, generics
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from collections import Counter
import json

from .models import (
    MostCheapBank,
    ForeignBank,
    BankgroupInfo,
    NaverNews,
    BankInfo,
    CountryInfo,
    RealTimeInfo,
    XGBoostInfo_YEN,
    XGBoostInfo_USD,
    XGBoostInfo_EURO,
    LSTMInfo_YEN,
    LSTMInfo_USD,
    LSTMInfo_EURO,
)

from .serializers import (
    MostCheapBankSerializer,
    BankgroupInfoSerializer,
    ForeignBankSerializer,
    NaverNewsSerializer,
    BankInfoSerializer,
    CountryInfoSerializer,
    RealTimeInfoSerializer,
    XGBoostEUROInfoSerializer,
    XGBoostUSDInfoSerializer,
    XGBoostYENInfoSerializer,
    LSTMUSDSerializer,
    LSTMYENSerializer,
    LSTMEUROSerializer,
)


class ListBank(ModelViewSet):
    queryset = MostCheapBank.objects.all()
    serializer_class = MostCheapBankSerializer

    # http://127.0.0.1:8000/api/banklist/?bank_name=bank_code
    def get_queryset(self):
        qs = super().get_queryset()
        bank_name = self.request.query_params.get('bank_name')
        country_name = self.request.query_params.get('country_name')
        if bank_name:
            qs = qs.filter(bank_name=bank_name)
        if country_name:
            qs = qs.filter(country_name=country_name)
        return qs


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def MostCheapBuy(request, country_name):
    mostcheap = MostCheapBank.objects.filter(
        country_name=country_name).order_by('buy')
    serializer = MostCheapBankSerializer(mostcheap, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def Wordcloud(request):
    news = NaverNews.objects.all().values()
    words = []
    for i in news:
        tmp = words.extend(i['words'].split(","))

    count = Counter(words)
    words = [dict(zip(['text', 'value'], i)) for i in count.most_common()]
    # print(words)

    return Response(json.dumps(words, ensure_ascii=False))


class ListBankGroupInfo(ModelViewSet):
    queryset = BankgroupInfo.objects.all()
    serializer_class = BankgroupInfoSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        bank_name = self.request.query_params.get('bank_name')
        country_name = self.request.query_params.get('country_name')
        if bank_name and country_name:
            qs = qs.filter(bank_name=bank_name, country_name=country_name)
        if country_name:
            qs = qs.filter(country_name=country_name)
        return qs


class ListForeignBank(ModelViewSet):
    queryset = ForeignBank.objects.all()
    serializer_class = ForeignBankSerializer


class ListNaverNews(ModelViewSet):
    queryset = NaverNews.objects.all()
    serializer_class = NaverNewsSerializer


class ListBankInfo(ModelViewSet):
    queryset = BankInfo.objects.all()
    serializer_class = BankInfoSerializer


class ListCountryInfo(ModelViewSet):
    queryset = CountryInfo.objects.all()
    serializer_class = CountryInfoSerializer
    # http://127.0.0.1:8000/api/countryinfo/?compare=compare

    def get_queryset(self):
        qs = super().get_queryset()
        compare = self.request.query_params.get('compare')
        if compare:
            qs = qs.exclude(country_name='CNY')
            qs = qs.exclude(country_name='USD')
            qs = qs.exclude(country_name='JPY')
        return qs


class ListRealTimeInfo(ModelViewSet):
    queryset = RealTimeInfo.objects.all()
    serializer_class = RealTimeInfoSerializer


class ListXGBoostUSD(ModelViewSet):
    queryset = XGBoostInfo_USD.objects.all()
    serializer_class = XGBoostUSDInfoSerializer


class ListXGBoostYEN(ModelViewSet):
    queryset = XGBoostInfo_YEN.objects.all()
    serializer_class = XGBoostYENInfoSerializer


class ListXGBoostEURO(ModelViewSet):
    queryset = XGBoostInfo_EURO.objects.all()
    serializer_class = XGBoostEUROInfoSerializer


class ListLSTMUSDInfo(ModelViewSet):
    queryset = LSTMInfo_USD.objects.all()
    serializer_class = LSTMUSDSerializer


class ListLSTMYENInfo(ModelViewSet):
    queryset = LSTMInfo_YEN.objects.all()
    serializer_class = LSTMYENSerializer


class ListLSTMEUROInfo(ModelViewSet):
    queryset = LSTMInfo_EURO.objects.all()
    serializer_class = LSTMEUROSerializer
