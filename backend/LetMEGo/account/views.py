from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
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
)
from knox.models import AuthToken
from django.shortcuts import get_object_or_404
User = get_user_model()


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        if len(request.data["username"]) < 6 or len(request.data["password"]) < 4:
            body = {"message": "short field"}
            return Response(body, status=status.HTTP_400_BAD_REQUEST)
        if request.data["password"] != request.data["user_pwcheck"]:
            body = {"message": "Password is not same"}
            return Response(body, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=request.data["email"]).exists():
            body = {"message": "Email is already exist"}
            return Response(body, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


@api_view(['POST'])
def Regist(request):

    if len(request.data[0]["username"]) < 6 or len(request.data[0]["password"]) < 4:
        body = {"message": "short field"}
        return Response(body, status=status.HTTP_400_BAD_REQUEST)

    if request.data[0]["password"] != request.data[0]["user_pwcheck"]:
        body = {"message": "Password is not same"}
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

    return Response({'result':True})

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )

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

@api_view(['GET','PUT'])
def UpdateAPI(request):

    if request.data[0]["id"] == request.data[1]["user_id"]:

        serializer = CreateUserSerializer(data=request.data[0])
        serializer.is_valid(raise_exception=True)
        
        request.data[1]['user_id'] = user.id
        user_bank = CreateUserBankSerializer(data=request.data[1])
        user_bank.is_valid(raise_exception=True)
        
        user = serializer.save()
        user_bank.save()

    return Response({'result':True})