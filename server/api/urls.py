from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('saveRecipe', views.saveRecipe, name='saveRecipe'),
    path('getRecipeList', views.getRecipeList, name='get recipe list'),
    path('getOrderList', views.getOrderList, name='get order list'),
    path('orderRecipe', views.orderRecipe, name='order recipe'),
    path('cancelOrder', views.cancelOrder, name='cancel order'),
    path('getDelivery', views.getDelivery, name='get delivery')
]