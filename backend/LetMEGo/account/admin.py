from django.contrib import admin
from .models import User
from django.contrib.auth import get_user_model

from .models import User_bank

admin.site.register(User_bank)
