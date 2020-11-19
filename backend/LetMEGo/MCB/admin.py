from django.contrib import admin

# Register your models here.
from .models import MostCheapBank, ForeignBank, BankgroupInfo, NaverNews, BankInfo, CountryInfo

admin.site.register(MostCheapBank)
admin.site.register(BankgroupInfo)
admin.site.register(ForeignBank)
admin.site.register(NaverNews)
admin.site.register(BankInfo)
admin.site.register(CountryInfo)
