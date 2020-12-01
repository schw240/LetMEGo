SECRET_KEY = 'y$ar(&i4=o_i1i(w8jlfwa3tho*8$@!!64_wblqgdd$7nm_z&t'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'LetMEGo',
        'USER': 'admin',
        'PASSWORD': '1q2w3e4r5t',
        'HOST': 'django-letmego.cuwex8kz3bin.ap-northeast-2.rds.amazonaws.com',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': 'SET sql_mode="STRICT_TRANS_TABLES"'
        }
    }
}
