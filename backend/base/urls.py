from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('tables/', views.getTables, name="tables"),
    path('tables/<str:pk>/', views.getTable, name="table"),
]
