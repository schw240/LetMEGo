from rest_framework import serializers
from .models import MostCheapBank, BankgroupInfo, ForeignBank, NaverNews, BankInfo, CountryInfo, RealTimeInfo


class MostCheapBankSerializer(serializers.ModelSerializer):
    country_flag = serializers.ReadOnlyField(source='country_name.country_flag')
    name_kor = serializers.ReadOnlyField(source='country_name.name_kor')
    bank_name_nm = serializers.ReadOnlyField(source='bank_name.bank_name')
    bank_logo = serializers.ReadOnlyField(source='bank_name.bank_logo')
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


class RealTimeInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = RealTimeInfo
