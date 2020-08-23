from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('saveRecipe', views.saveRecipe, name='saveRecipe'),
    path('getRecipeList', views.getRecipeList, name='getRecipeList'),
    path('getOrderList', views.getOrderList, name='getOrderList')
]