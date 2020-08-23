from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Driver, Recipe, Ingredient, Order 

import json


# Put the logging info within your django view


def index(request):
    u = User.objects.get(pk=1)
    return HttpResponse(f"Hello, world. You're at the polls index.{u.user_name}")

@csrf_exempt
def saveRecipe(request):
    if request.method == "POST":
        requestJson = json.loads(request.body)
        u = User.objects.get(user_name=requestJson["username"])
        r = u.recipe_set.create(recipe_name=requestJson["recipe"]["name"])
        for ingredient in requestJson["recipe"]["recipeIngredient"]:
            r.ingredient_set.create(ingredient_text=ingredient)
    return HttpResponse("didn't make it")

@csrf_exempt
def orderRecipe(request):
    pass

@csrf_exempt
def getRecipeList(request):
    username = request.POST['username']
    user = User.objects.get(user_name=username)
    recipeList = Recipe.objects.filter(user_name=user)
    response = {"recipes" : []}
    for recipe in recipeList:
        recipeJson = {"name":recipe.recipe_name, "recipeIngredients":[]}
        recipeIngredient = [item for item in (Ingredient.objects.filter(recipe_name=recipe))]
        addIngredient = map(lambda i: recipeJson["recipeIngredients"].append(i.ingredient_text), recipeIngredient)
        list(addIngredient)
        response["recipes"].append(recipeJson)
    return JsonResponse(response)

@csrf_exempt
def getOrderList(request):
    username = request.POST['username']
    user = User.objects.get(user_name=username)
    orderList = Order.objects.filter(user_name=user)
    response = {"pendingOrders" : [], "deliveredOrders" : [], "ingredientList": []}
    for order in orderList:
        name = Recipe.orderJson
        ingredientList = Ingredient.objects.filter(recipe_name=name)
        orderJson = {"name":name, "recipeIngredient":[i.ingredient_text for i in ingredientList]}
        if order.completed:
            response["pendingOrders"].append(orderJson)
        else:
            response["deliveredOrders"].append(orderJson)
            response["ingredientList"] += orderJson["recipeIngredient"]
    return JsonResponse(response)

@csrf_exempt
def getDelivery(request):
    pass
