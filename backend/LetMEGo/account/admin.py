from django.contrib import admin
from .models import LMGUser, User_bank, Withdrawal

# Register your models here.
@admin.register(LMGUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user_id','user_email']
    list_display_links = ['user_id','user_email']