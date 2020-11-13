from rest_framework import serializers
from .models import MostCheapBank, BankgroupInfo, ForeignBank, NaverNews

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
        