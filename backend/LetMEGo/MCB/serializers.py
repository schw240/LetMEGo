from rest_framework import serializers
from .models import MostCheapBank, BankgroupInfo, ForeignBank, NaverNews, BankInfo, CountryInfo

class MostCheapBankSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = MostCheapBank

class BankgroupInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = BankgroupInfo


class ForeignBankSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = ForeignBank

class NaverNewsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = NaverNews

class BankInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = BankInfo

class CountryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = CountryInfo
        