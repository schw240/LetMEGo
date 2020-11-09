from django.shortcuts import render
from rest_framework import generics
# Create your views here.

from .models import MostCheapBank
from .serializers import MostCheapBankSerializer

class ListBank(generics.ListCreateAPIView):
    queryset = MostCheapBank.objects.all()
    serializer_class = MostCheapBankSerializer

class DetailBank(generics.RetrieveUpdateDestroyAPIView):
    queryset = MostCheapBank.objects.all()
    serializer_class = MostCheapBankSerializer


