from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Driver, Recipe, Ingredient, Order 

import json


# Put the logging info within your django view

def recipeToJson(recipe, orderId=None):
    recipeName = recipe.recipe_name
    recipeId = recipe.id
    ingredientList = Ingredient.objects.filter(recipe_name=recipe)
    ingredientJsons = [{"id":i.id, "text":i.ingredient_text} for i in ingredientList]
    if orderId:
        [i.update({"orderId":orderId}) for i in ingredientJsons]
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
        r = u.recipe_set.create(recipe_name=requestJson["recipe"]["name"], author_name="placeholder")
        r.save()
        for ingredient in requestJson["recipe"]["recipeIngredient"]:
            ingredient = r.ingredient_set.create(ingredient_text=ingredient)
            ingredient.save()
        return HttpResponse("gotchu")
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
    orderList = Order.objects.filter(user_name=user).select_related("recipe","driver")
    response = {"pendingOrders" : [], "deliveredOrders" : [], "ingredientList": []}
    for order in orderList:
        orderId = order.id
        recipe = order.recipe
        recipeJson = recipeToJson(recipe, orderId)
        orderJson = {"id":orderId, "recipe":recipeJson}
        if order.completed:
            orderJson.update({"driver":order.driver.driver_name})
            response["deliveredOrders"].append(orderJson)
        else:
            response["pendingOrders"].append(orderJson)
            response["ingredientList"] += orderJson["recipe"]["recipeIngredient"]
    return JsonResponse(response)

@csrf_exempt
def getDelivery(request):
    driver_name = request.POST["driver"]
    driver = Driver.objects.get(driver_name=driver_name)
    driverOrders = Order.objects.select_related('user_name').filter(driver=driver)
    priorityUsers = set()
    for order in driverOrders:
        priorityUsers.add(order.user_name)
    for user in priorityUsers:
        userOrders= Order.objects.filter(user_name=user, completed=False)
        deliveryJson = {"username":user.user_name, "orderList":[], "ingredientList":[]}
        for userOrder in userOrders:
            orderId = userOrder.id
            recipe = userOrder.recipe
            recipeJson = recipeToJson(recipe)
            deliveryJson["ingredientList"] += recipeJson["recipeIngredient"]
            deliveryJson["orderList"].append(orderId)
        if not deliveryJson["orderList"] == []:
            return(JsonResponse(deliveryJson))
    for user in User.objects.all():
        userOrders= Order.objects.filter(user_name=user, completed=False)
        deliveryJson = {"username":user.user_name, "orderList":[], "ingredientList":[]}
        for userOrder in userOrders:
            orderId = userOrder.id
            recipe = userOrder.recipe
            recipeJson = recipeToJson(recipe)
            deliveryJson["ingredientList"] += recipeJson["recipeIngredient"]
            deliveryJson["orderList"].append(orderId)
        if not deliveryJson["orderList"] == []:
            return(JsonResponse(deliveryJson))

@csrf_exempt
def getPastDelivery(request):
    driver_name = request.POST["driver"]
    driver = Driver.objects.get(driver_name=driver_name)
    pastOrders = Order.objects.select_related('user_name').filter(driver=driver)
    userList = []
    for order in pastOrders:
        userList.append(order.user_name.user_name)
    return(JsonResponse({"usernames":userList}))

@csrf_exempt
def cancelOrder(request):
    orderId = request.POST["id"]
    Order.objects.get(pk=orderId).delete()
    return HttpResponse("Deleted order")

@csrf_exempt
def completeOrder(request):
    requestJson = json.loads(request.body)
    orderList = requestJson["orderIds"]
    driver_name = requestJson["driver"]
    driver = Driver.objects.get(driver_name=driver_name)
    for orderId in orderList:
        order=Order.objects.get(pk=orderId)
        order.completed = True
        order.driver = driver
        order.save()
    return(HttpResponse("Thank"))
