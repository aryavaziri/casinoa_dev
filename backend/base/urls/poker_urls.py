from django.urls import path
from base.views import poker_views as views

urlpatterns = [
    # path('', views.getTables, name="tables"),
    path('<str:pk>/', views.getGame, name="poker"),
]
