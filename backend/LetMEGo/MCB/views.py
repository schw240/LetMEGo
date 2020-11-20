from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import generics, viewsets
# Create your views here.

from .models import MostCheapBank, ForeignBank, BankgroupInfo, NaverNews, BankInfo, CountryInfo, RealTimeInfo
from .serializers import MostCheapBankSerializer, BankgroupInfoSerializer, ForeignBankSerializer, NaverNewsSerializer, BankInfoSerializer, CountryInfoSerializer, RealTimeInfoSerializer
# generics.ListCreateAPIView


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


class DetailBank(generics.RetrieveUpdateDestroyAPIView):
    queryset = MostCheapBank.objects.all()
    serializer_class = MostCheapBankSerializer


class ListBankGroupInfo(ModelViewSet):
    queryset = BankgroupInfo.objects.all()
    serializer_class = BankgroupInfoSerializer


class DetailBankGroupInfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = BankgroupInfo.objects.all()
    serializer_class = BankgroupInfoSerializer


class ListForeignBank(ModelViewSet):
    queryset = ForeignBank.objects.all()
    serializer_class = ForeignBankSerializer


class DetailForeignBank(generics.RetrieveUpdateDestroyAPIView):
    queryset = ForeignBank.objects.all()
    serializer_class = ForeignBankSerializer


class ListNaverNews(ModelViewSet):
    queryset = NaverNews.objects.all()
    serializer_class = NaverNewsSerializer


class DetailNaverNews(generics.RetrieveUpdateDestroyAPIView):
    queryset = NaverNews.objects.all()
    serializer_class = NaverNewsSerializer


class ListBankInfo(ModelViewSet):
    queryset = BankInfo.objects.all()
    serializer_class = BankInfoSerializer


class DetailBankInfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = BankInfo.objects.all()
    serializer_class = BankInfoSerializer


class ListCountryInfo(ModelViewSet):
    queryset = CountryInfo.objects.all()
    serializer_class = CountryInfoSerializer


class DetailCountryInfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = CountryInfo.objects.all()
    serializer_class = CountryInfoSerializer


class ListRealTimeInfo(ModelViewSet):
    queryset = RealTimeInfo.objects.all()
    serializer_class = RealTimeInfoSerializer


class DetailRealTimeInfo(generics.RetrieveUpdateDestroyAPIView):
    queryset = RealTimeInfo.objects.all()
    serializer_class = RealTimeInfoSerializer
