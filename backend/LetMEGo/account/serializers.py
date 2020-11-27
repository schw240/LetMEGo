from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from .models import User_bank, Withdrawal
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings
JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
# from .models import LMGUser

User = get_user_model()


# 회원가입 시리얼라이저

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "user_emailcheck"]
        extra_kwargs = {"password": {"write_only": True},
                        "user_emailcheck": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            email=validated_data["email"],
            user_emailcheck=validated_data["user_emailcheck"]
        )
        return user


# 은행
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
    username = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)

        if user is None:
            return {
                'username': 'None'
            }
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        return {
            'username': user.username,
            'token': jwt_token
        }


# class LoginUserSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()
#     # token = serializers.CharField(max_length=255, read_only=True)

#     # def validate(self, data):
#     #     user = authenticate(**data)
#     #     payload = JWT_PAYLOAD_HANDLER(user)
#     #     jwt_token = JWT_ENCODE_HANDLER(payload)

#     #     if user and user.is_active:
#     #         return {
#     #             'username': user.username,
#     #             'token': 'jwt_token'
#     #         }
#     #     raise serializers.ValidationError(
#     #         "Unable to log in with provided credentials.")
#     class Meta:
#         model = User
#         fields = "__all__"


class WithdrawalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Withdrawal
        fields = "__all__"


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_bank
        fields = "__all__"


class UserInfoSerializer(serializers.ModelSerializer):
    #username = ReadOnlyField(source='user.username')

    class Meta:
        model = User
        exclude = ["password", "first_name", "last_name", "is_staff",
                   "is_active", "groups", "user_permissions", "is_superuser"]
