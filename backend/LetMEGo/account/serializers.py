from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from .models import User_bank, Withdrawal
# from .models import LMGUser

User = get_user_model()



# 회원가입 시리얼라이저

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "user_pwcheck", "user_emailcheck"]
        extra_kwargs = {"password": {"write_only": True}, "user_pwcheck": {"write_only": True}, "user_emailcheck": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data["username"], 
            password = validated_data["password"], 
            email = validated_data["email"],
            user_pwcheck = validated_data["user_pwcheck"],
            user_emailcheck = validated_data["user_emailcheck"]
        )
        return user
    

#은행
class CreateUserBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_bank
        fields = '__all__'
        
    # def create(self, validated_data):
    #     user_bank = User_bank.objects.create_user(
    #         user_id = validated_data["user_id"], 
    #         gieob = validated_data["gieob"], 
    #         kookmin = validated_data["kookmin"],
    #         hana = validated_data["hana"],
    #         suhyup = validated_data["suhyup"],
    #         nonghyup = validated_data["usdr_id"], 
    #         woori = validated_data["gieob"], 
    #         standard = validated_data["kookmin"],
    #         citi = validated_data["hana"],
    #         daegu = validated_data["suhyup"],
    #         busan = validated_data["kookmin"],
    #         jeju = validated_data["hana"],
    #         jeonbug = validated_data["suhyup"],
    #         gyeongnam = validated_data["usdr_id"], 
    #         shinhan = validated_data["gieob"]
    #     )
    #     return user_bank
    


# 접속 유지중인지 확인할 시리얼라이저

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


# 로그인 시리얼라이저 

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class WithdrawalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Withdrawal
        fields = "__all__"

class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_bank
        fields = "__all__"