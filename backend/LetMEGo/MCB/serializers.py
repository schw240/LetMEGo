from rest_framework import serializers
from .models import MostCheapBank, BankgroupInfo, ForeignBank, NaverNews, BankInfo, CountryInfo, RealTimeInfo, XGBoostInfo_USD, XGBoostInfo_EURO, XGBoostInfo_YEN, LSTMInfo_EURO, LSTMInfo_USD, LSTMInfo_YEN


class MostCheapBankSerializer(serializers.ModelSerializer):
    country_flag = serializers.ReadOnlyField(
        source='country_name.country_flag')
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


class XGBoostUSDInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = XGBoostInfo_USD


class XGBoostYENInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = XGBoostInfo_YEN


class XGBoostEUROInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = XGBoostInfo_EURO


class LSTMUSDSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = LSTMInfo_USD


class LSTMYENSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = LSTMInfo_YEN


class LSTMEUROSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = LSTMInfo_EURO
