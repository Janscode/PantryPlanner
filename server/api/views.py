from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Recipe, Ingredient

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
def getRecipes(request):
    pass

@csrf_exempt
def getDelivery(request):
    pass
