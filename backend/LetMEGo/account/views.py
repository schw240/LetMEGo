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
    CreateUserSerializer,
    UserSerializer,
    LoginUserSerializer,
)
from knox.models import AuthToken
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


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print('11')
        serializer.is_valid(raise_exception=True)
        print('22')
        user = serializer.validated_data
        print('33')
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user),
            }
        )

class UserAPI(APIView):
    def get(self, request):
        qs = User.objects.all()
        print(qs.values())
        serializer=UserSerializer(qs, many=True)
        return  Response(serializer.data)