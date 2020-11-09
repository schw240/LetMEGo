from rest_framework import serializers
from .models import MostCheapBank

class MostCheapBankSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'bank_name',
            'country_name',
            'buy',
            'update_date',
        )
        model = MostCheapBank