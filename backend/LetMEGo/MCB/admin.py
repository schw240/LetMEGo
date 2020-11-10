from django.contrib import admin

# Register your models here.
from .models import MostCheapBank, ForeignBank, BankgroupInfo

admin.site.register(MostCheapBank)
admin.site.register(BankgroupInfo)
admin.site.register(ForeignBank)