from django.urls import path
from base.views import poker_views as views
from base.views import action_views as action

urlpatterns = [
    # path('', views.getTables, name="tables"),
    path('<str:pk>/', views.getGame, name="poker"),
    path('<str:pk>/enter/', views.gameEnter, name="Enter"),
    path('<str:pk>/leave/', views.gameLeave, name="Leave"),
    path('<str:pk>/new/', views.newGame, name="New-Game"),
    path('<str:pk>/action/', action.action, name="Action"),
]
