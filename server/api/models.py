import datetime

from django.db import models
from django.utils import timezone

class User(models.Model):
    user_name = models.CharField(max_length=200)
    def __str__(self):
        return self.user_name

class Driver(models.Model):
    driver_name = models.CharField(max_length=200)
    def __str__(self):
        return self.driver_name

class Recipe(models.Model):
    user_name = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=200)
    author_name = models.CharField(max_length=200)
    def __str__(self):
        return self.recipe_name

class Ingredient(models.Model):
    recipe_name = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient_text = models.CharField(max_length=200)
    def __str__(self):
        return self.ingredient_text

class Order(models.Model):
    user_name = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, blank=True, null=True)
    
    

