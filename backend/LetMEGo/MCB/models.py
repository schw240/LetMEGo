from django.db import models

# Create your models here.
class MostCheapBank(models.Model):
    bank_name = models.CharField(max_length=20, null=True)
    country_name = models.CharField(max_length=20, null=True)
    buy = models.FloatField(null=True)
    buy_fee_rate = models.CharField(max_length=30, null=True)
    sell = models.FloatField(null=True)
    sell_fee_rate = models.CharField(max_length=30, null=True)
    trading_rate = models.FloatField(null=True)
    update_date = models.DateField()

    def __str__(self):
        return self.bank_name