from django.db import models

# Create your models here.

class CountryInfo(models.Model):
    country_name = models.CharField(
        max_length=10, verbose_name='나라이름(영어)', primary_key=True)
    country_flag = models.CharField(
        max_length=10, null=True, verbose_name='국기')
    name_kor = models.CharField(
        max_length=10, null=True, verbose_name='나라이름(한국어)')

    def __str__(self):
        return self.country_name

    class Meta:
        db_table = 'Country_Info'
        verbose_name = '나라 정보'
        verbose_name_plural = '나라 정보'


class BankInfo(models.Model):
    bank_code = models.CharField(
        max_length=4, verbose_name='은행코드', primary_key=True)
    bank_name = models.CharField(max_length=20, null=True, verbose_name='은행명')
    bank_logo = models.CharField(max_length=20, null=True, verbose_name='은행로고')

    def __str__(self):
        return self.bank_name

    class Meta:
        db_table = 'Bank_Info'
        verbose_name = '은행 정보'
        verbose_name_plural = '은행 정보'


class MostCheapBank(models.Model):
    bank_name = models.ForeignKey(BankInfo, on_delete=models.CASCADE)
    country_name = models.ForeignKey(CountryInfo, on_delete=models.CASCADE)
    buy = models.FloatField(null=True, verbose_name='현찰 살 때')
    buyfeerate = models.CharField(
        max_length=30, null=True, verbose_name='수수료율')
    sell = models.FloatField(null=True, verbose_name='현찰 팔 때')
    sellfeerate = models.CharField(
        max_length=30, null=True, verbose_name='수수료율')
    tradingrate = models.FloatField(null=True, verbose_name='매매기준율')
    updatedate = models.DateTimeField(
        null=False, auto_now_add=True, verbose_name='등록날짜')

    class Meta:
        db_table = 'mybank'
        verbose_name = '국내환율'
        verbose_name_plural = '국내환율'
        unique_together = (('bank_name', 'country_name'),)


class BankgroupInfo(models.Model):
    bank_name = models.CharField(max_length=20, verbose_name='은행이름')
    country_name = models.CharField(
        max_length=20, null=True, verbose_name='외화')
    buyfeerate = models.CharField(
        max_length=200, null=True, verbose_name='환전수수료(사실때)')
    stdprefrate = models.TextField(
        max_length=20000, null=True, verbose_name='기본우대율(%)')
    maxprefrate = models.TextField(
        max_length=20000, null=True, verbose_name='최대우대율(%)')
    treatandevent = models.TextField(
        max_length=20000, null=True, verbose_name='우대사항&환전이벤트')
    basedate = models.CharField(max_length=30, default='-', verbose_name='기준일')
    updatedate = models.DateTimeField(auto_now=True, verbose_name='데이터 수정 시각')

    def __str__(self):
        return self.bank_name

    class Meta:
        unique_together = (('bank_name', 'country_name'))
        db_table = 'bankgroup'
        verbose_name = '우대사항'
        verbose_name_plural = '우대사항'


class ForeignBank(models.Model):
    country_name = models.CharField(
        max_length=20, verbose_name='나라', primary_key=True)
    usd = models.FloatField(null=True, verbose_name='달러 환율')
    jpy = models.FloatField(null=True, verbose_name='엔화 환율')
    updatedate = models.DateTimeField(auto_now=True, verbose_name='등록날짜')

    def __str__(self):
        return self.country_name

    class Meta:
        db_table = 'foreign_bank'
        verbose_name = '달러&엔화'
        verbose_name_plural = '달러&엔화'


class NaverNews(models.Model):
    #
    seq = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, verbose_name='뉴스 제목')
    link = models.TextField(max_length=200, null=True, verbose_name='링크')
    company = models.CharField(max_length=30, null=True, verbose_name='신문사')
    content = models.TextField(max_length=max, verbose_name='내용')
    upload_date = models.CharField(
        max_length=30, null=True, verbose_name='뉴스 날자')
    craw_date = models.DateTimeField(auto_now=True, verbose_name='크롤링 날자')
    words = models.TextField(max_length=max, verbose_name='단어조각')

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'NaverNews'
        verbose_name = '환율 기사'
        verbose_name_plural = '환율 기사'


class RealTimeInfo(models.Model):
    seq = models.AutoField(primary_key=True)
    time = models.CharField(max_length=30, verbose_name='시간')
    basePrice = models.CharField(
        max_length=20, null=True, verbose_name='매매 기준율')
    signedChangePrice = models.CharField(
        max_length=30, null=True, verbose_name='변동금액')
    signedChangeRate = models.CharField(
        max_length=30, null=True, verbose_name='변동 퍼센트')

    def __str__(self):
        return self.time

    class Meta:
        db_table = 'RealTime_Info'
        verbose_name = '실시간 환율 정보'
        verbose_name_plural = '실시간 환율 정보'


class XGBoostInfo(models.Model):
    seq = models.AutoField(primary_key=True)
    date = models.CharField(max_length=30, verbose_name='날짜')
    dollar_close = models.FloatField(null=True, verbose_name='달러 종가')

    
    def __str__(self):
        return self.date

    class Meta:
        db_table = 'XGBoost_Info'
        verbose_name = 'XGboost예측테이블'
        verbose_name_plural = 'XGboost예측테이블'

