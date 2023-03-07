from django.urls import path
from base.views import poker_views as views

urlpatterns = [
    # path('', views.getTables, name="tables"),
    path('<str:pk>/', views.getGame, name="poker"),
    path('<str:pk>/round/', views.getRound, name="pokerr"),
    path('<str:pk>/enter/', views.gameEnter, name="Enter"),
    path('<str:pk>/leave/', views.gameLeave, name="Leave"),
    path('<str:pk>/action/', views.action, name="Action"),
]
