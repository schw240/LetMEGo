from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import LMGUser, User_bank, Withdrawal
from .serializers import LMGUserSerialzier

@api_view(['GET','POST'])
def Signup(request):
    if request.method == 'GET':
        users = LMGUserSerialzier(LMGUser.objects.all(), many=True)
        return Response(users.data)

    elif request.method == 'POST':
        signup = LMGUserSerialzier(data=request.data)
        if signup.is_valid():
            signup.save()
            return Response(signup.data, status=201)