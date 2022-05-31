from django.contrib import admin
from django.urls import include, path
from django.views import View
import re
from polls import views

urlpatterns = [
    path("Producten/", views.homeScreen , name="home"),
    path("Producten/add", views.addProduct, name="Product toevoegen"),
    path("Producten/CreateProduct", views.CreateProduct, name="CreateProduct"),
    path("Producten/product/<value>", views.productPagina, name="product"),
]