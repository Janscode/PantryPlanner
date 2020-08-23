from django.contrib import admin

from .models import User, Recipe, Order, Ingredient, Driver
# Register your models here.
admin.site.register(User)
admin.site.register(Recipe)
admin.site.register(Order)
admin.site.register(Ingredient)
admin.site.register(Driver)