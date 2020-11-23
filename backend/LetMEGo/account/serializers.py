from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import LMGUser, User_bank, Withdrawal

User = get_user_model()

class LMGUserSerialzier(serializers.ModelSerializer):
    user_id = serializers.CharField(required=True)
    user_pw = serializers.CharField(required=True)
    user_email = serializers.EmailField(required=True)

    class Meta:
        model = LMGUser
        fields = "__all__"

    def create(self, validated_data):
        user = LMGUser.objects.create(
            user_id=validated_data['user_id'],
            user_email=validated_data['user_email']
        )  
        user.set_password(validated_data['user_pw'])
        #중요!!!
        user.save()
        return user
