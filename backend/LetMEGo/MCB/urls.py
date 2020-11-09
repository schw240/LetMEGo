from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListBank.as_view()),
    path('<int:pk>/', views.DetailBank.as_view()),
]