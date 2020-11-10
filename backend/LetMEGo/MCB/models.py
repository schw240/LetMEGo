from django.db import models

# Create your models here.
class MostCheapBank(models.Model):
    #bank_name = models.CharField(max_length=20, null=True,verbose_name='은행이름')
    country_name = models.CharField(max_length=20, verbose_name='외화',primary_key=True)
    buy = models.FloatField(null=True, verbose_name='현찰 살 때')
    buyfeerate = models.CharField(max_length=30, null=True,verbose_name='수수료율')
    sell = models.FloatField(null=True,verbose_name='현찰 팔 때')
    sellfeerate = models.CharField(max_length=30, null=True, verbose_name='수수료율')
    tradingrate = models.FloatField(null=True, verbose_name='매매기준율')
    updatedate = models.DateField(auto_now_add=True, verbose_name='등록날짜')

    def __str__(self):
        return self.country_name
    
    class Meta:
        db_table = 'mybank'
        verbose_name = '국내환율'
        verbose_name_plural = '국내환율'


class BankgroupInfo(models.Model):
    bank_name = models.CharField(max_length=20, verbose_name='은행이름',primary_key=True)
    country_name = models.CharField(max_length=20, null=True, verbose_name='외화')
    buyfeerate = models.CharField(max_length=200, null=True,verbose_name='환전수수료(사실때)')
    stdprefrate = models.TextField(max_length=20000, null=True,verbose_name='기본우대율(%)')
    maxprefrate = models.TextField(max_length=20000, null=True, verbose_name='최대우대율(%)')
    treatandevent = models.TextField(max_length=20000, null=True, verbose_name='우대사항&환전이벤트')
    updatedate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')

    def __str__(self):
        return self.bank_name
    
    class Meta:
        db_table = 'bankgroup'
        verbose_name = '우대사항'
        verbose_name_plural = '우대사항'

class ForeignBank(models.Model):
    country_name = models.CharField(max_length=20, verbose_name='나라' ,primary_key=True)
    usd = models.FloatField(null=True,verbose_name='달러 환율')
    jpy = models.FloatField(null=True,verbose_name='엔화 환율')
    updatedate = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')

    def __str__(self):
        return self.country_name
    
    class Meta:
        db_table = 'foreign_bank'
        verbose_name = '달러&엔화'
        verbose_name_plural = '달러&엔화'