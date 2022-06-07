import re
from tkinter import Image
from django.shortcuts import redirect, render
from django.utils.timezone import datetime
from django.http import HttpResponse
from numpy import prod, product
from .models import Product

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

winkelmandje =[]

def homeScreen(request):
    first_item = Product.objects.filter()
    return render(
        request,
        'product/Producten.html',
        {
            "producten": first_item,
        }
    )
def addProduct(request):
    return render(
        request,
        'product/CreateProduct.html'
    )
def CreateProduct(request):
    Naam = request.POST["naam"]
    Beschrijving = request.POST["beschrijving"]
    Prijs = request.POST["prijs"]
    Image_URL= request.POST["image_URL"]
    Image_Beschrijving = request.POST["image_Beschrijving"]
    Product.objects.create(naam = Naam, beschrijving= Beschrijving, prijs=Prijs, image_URL = Image_URL, image_description=Image_Beschrijving)
    return render(
        request,
        "product/Succes.html",
        {
            'Succes_Title' : "Product succesvol toegevoegd",
            'Succes_Message': "Het product "+Naam+" is toegevoegd",
        }
    )
def productPagina(request, value):
    product = Product.objects.get(id= value)
    return render(
        request,
        "product/Product.html",
        {
            "product": product
        }
    )
def AddToWinkelwagentje(request):
    productID = request.POST["id"]
    aantal = request.POST["amount"]

    product = Product.objects.get(id= productID)
    orderline = (product, aantal)

    winkelmandje.append(orderline)
    
    print("product gevonden")
    return redirect("/Producten")

def Winkelmandje(request):
        return render(
        request,
        "winkelmandje.html",
        {
            "Producten": winkelmandje
        }
    )