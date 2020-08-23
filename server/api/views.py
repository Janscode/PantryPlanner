from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Driver, Recipe, Ingredient, Order 

import json


# Put the logging info within your django view

def recipeToJson(recipe):
    recipeName = recipe.recipe_name
    recipeId = recipe.id
    ingredientList = Ingredient.objects.filter(recipe_name=recipe)
    ingredientJsons = [{"id":i.id, "text":i.ingredient_text} for i in ingredientList]
    recipeJson = {"id":recipeId, "name":recipeName, "recipeIngredient":ingredientJsons}
    return recipeJson

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
            ingredient = r.ingredient_set.create(ingredient_text=ingredient)
            ingredient.save()
    return HttpResponse("didn't make it")

@csrf_exempt
def orderRecipe(request):
    username = request.POST['username']
    recipeId = request.POST['id']
    user = User.objects.get(user_name=username)
    recipe = Recipe.objects.get(pk=recipeId)
    order = user.order_set.create(recipe=recipe)
    order.save()
    orderId = order.id
    return JsonResponse({"id":orderId})

@csrf_exempt
def getRecipeList(request):
    username = request.POST['username']
    user = User.objects.get(user_name=username)
    recipeList = Recipe.objects.filter(user_name=user)
    response = {"recipes" : []}
    for recipe in recipeList:
        response["recipes"].append(recipeToJson(recipe))
    return JsonResponse(response)

@csrf_exempt
def getOrderList(request):
    username = request.POST['username']
    user = User.objects.get(user_name=username)
    orderList = Order.objects.filter(user_name=user)
    response = {"pendingOrders" : [], "deliveredOrders" : [], "ingredientList": []}
    for order in orderList:
        orderId = order.id
        recipe = order.recipe
        recipeJson = recipeToJson(recipe)
        orderJson = {"id":orderId, "recipe":recipeJson}
        if order.completed:
            response["deliveredOrders"].append(orderJson)
        else:
            response["pendingOrders"].append(orderJson)
            response["ingredientList"] += orderJson["recipe"]["recipeIngredient"]
    return JsonResponse(response)

@csrf_exempt
def getDelivery(request):
    pass

@csrf_exempt
def cancelOrder(request):
    orderId = request.POST["id"]
    Order.objects.get(pk=orderId).delete()
    return HttpResponse("Deleted order")