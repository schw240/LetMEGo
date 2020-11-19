from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import generics, viewsets
# Create your views here.

from .models import MostCheapBank, ForeignBank, BankgroupInfo, NaverNews, BankInfo, CountryInfo
from .serializers import MostCheapBankSerializer, BankgroupInfoSerializer, ForeignBankSerializer, NaverNewsSerializer, BankInfoSerializer, CountryInfoSerializer
#generics.ListCreateAPIView
class ListBank(ModelViewSet):
    queryset = MostCheapBank.objects.all()
    serializer_class = MostCheapBankSerializer

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


