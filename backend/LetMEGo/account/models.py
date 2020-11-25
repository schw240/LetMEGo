from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib import auth
from django.conf import settings
from django.contrib.auth import get_user_model


# User = get_user_model()
class User(AbstractUser):
    user_emailcheck = models.BooleanField(verbose_name='이메일 체크', default=False)


    class Meta:
        #db_table = 'LMGUser'
        verbose_name = 'LMG 유저'
        verbose_name_plural = 'LMG 유저'


class User_bank(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    gieob = models.BooleanField(default=False)
    kookmin = models.BooleanField(default=False)
    hana = models.BooleanField(default=False)
    suhyup = models.BooleanField(default=False)
    nonghyup = models.BooleanField(default=False)
    woori = models.BooleanField(default=False)
    standard = models.BooleanField(default=False) 
    citi = models.BooleanField(default=False)
    daegu = models.BooleanField(default=False)
    busan = models.BooleanField(default=False)
    jeju = models.BooleanField(default=False)
    jeonbug = models.BooleanField(default=False)
    gyeongnam = models.BooleanField(default=False)
    shinhan = models.BooleanField(default=False)


    def __str__(self):
        return str(self.user_id)

    class Meta:
        db_table = 'User_bank'
        verbose_name = '주거래 은행'
        verbose_name_plural = '주거래 은행'

class Withdrawal(models.Model):
    service = models.BooleanField(default=False)
    benefits = models.BooleanField(default=False)
    privacy = models.BooleanField(default=False)
    other = models.CharField(max_length=500, verbose_name='탈퇴이유')

    class Meta:
        db_table = 'Withdrawal'
        verbose_name = '회원 탈퇴'
        verbose_name_plural = '회원 탈퇴'
