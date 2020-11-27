from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, viewsets, generics, status, mixins
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import User_bank, Withdrawal, User
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password
# Create your views here.
from collections import Counter
import json
from django.contrib.auth import get_user_model
from .serializers import (
    UpdateSerializer,
    WithdrawalSerializer,
    CreateUserBankSerializer,
    CreateUserSerializer,
    UserSerializer,
    LoginUserSerializer,
    UserInfoSerializer,
)
from django.shortcuts import get_object_or_404
User = get_user_model()


@api_view(['POST'])
def Regist(request):

    if len(request.data[0]["username"]) < 6 or len(request.data[0]["password"]) < 4:
        body = {"message": "short field"}
        return Response(body, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=request.data[0]["email"]).exists():
        body = {"message": "Email is already exist"}
        return Response(body, status=status.HTTP_400_BAD_REQUEST)

    serializer = CreateUserSerializer(data=request.data[0])
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    request.data[1]['user_id'] = user.id
    user_bank = CreateUserBankSerializer(data=request.data[1])
    user_bank.is_valid(raise_exception=True)
    user_bank.save()

    return Response({'result': True})


@api_view(['POST'])
@permission_classes([AllowAny])
def LoginAPI(request):

    if request.method == 'POST':
        serializer = LoginUserSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
        if serializer.validated_data['username'] == "None":
            return Response({'message': 'fail'}, status=status.HTTP_200_OK)

        response = {
            'success': 'True',
            'token': serializer.data['token']
        }
        return Response(response, status=status.HTTP_200_OK)


class UserAPI(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # http://127.0.0.1:8000//account/user/?username=username
    def get_queryset(self):
        qs = super().get_queryset()
        username = self.request.query_params.get('username')
        if username:
            qs = qs.filter(username=username)
        return qs


@api_view(['POST'])
def WithdrawAPI(request):

    serializer = WithdrawalSerializer(data=request.data[0])
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response(request.data[0])  # 탈퇴이유 리턴해줌


@api_view(['POST'])
def UpdateAPI(request):

    bank_list = ["gieob", "kookmin", "hana", "suhyup", "nonghyup", "woori",
                 "standard", "citi", "daegu", "busan", "jeju", "jeonbug", "gyeongnam", "shinhan"]

    user = User.objects.get(username=request.user)
    for xx in request.data.items():
        print(xx)
        if xx[0] == 'email':
            user.email = request.data['email']
        if xx[0] == 'password':
            user.password = request.data['password']
            user.set_password(user.password)
        if xx[0] == 'user_emailcheck':
            user.user_emailcheck = request.data['user_emailcheck']
        if xx[0] in bank_list:
            print(xx[0], "xx[0]이 무엇이냐")
            user_bank = User_bank.objects.get(user_id=user.id)
            # print(user_bank.__dict__[xx[0]])
            res = user_bank.__dict__[xx[0]]

            # user_bank.update(xx[0]=True)
            # if res == False:
            setattr(user_bank, xx[0], xx[1])
            # else:
            #     setattr(user_bank, xx[0], False)
            # print(user_bank['"'"+xx[0]+"'"'])
            # user_bank['xx']
            # if user_bank["'"+xx[0]+"'"][0] == False:
            #     user_bank["'"+xx[0]+"'"] = True
            user_bank.save()

    user.save()

    return Response({'result': True})


@api_view(['GET'])
def UserInfoAPI(request):
    user = User.objects.get(username=request.user)
    # user = get_object_or_404(User, username=user)
    serializer = UserInfoSerializer(user)
    user_id = User_bank.objects.get(user_id=user.id)
    user_bank = CreateUserBankSerializer(user_id)
    whole_data = {"users": serializer.data, "user_bank": user_bank.data}
    return Response(whole_data)


@api_view(['POST'])
def DeleteUserAPI(request):
    user = User.objects.get(username=request.user)
    request.user.delete()

    return Response({'result': True})


@api_view(['GET'])
def OnlyUserInfoAPI(request):
    user = User.objects.get(username=request.user)
    # user = get_object_or_404(User, username=user)
    serializer = UserInfoSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def OnlyUserBankInfoAPI(request):
    user = User.objects.get(username=request.user)
    user_id = User_bank.objects.get(user_id=user.id)
    user_bank = CreateUserBankSerializer(user_id)
    return Response(user_bank.data)
