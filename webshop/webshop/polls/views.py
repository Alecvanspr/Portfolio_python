from datetime import date
from distutils.version import LooseVersion
import re
from tkinter import Image
from wsgiref.util import request_uri
from django import conf
from django.shortcuts import redirect, render
from django.utils.timezone import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate , login
from django.http import HttpResponse
from pytest import Item
from .models import Product, Bestelling, Orderline
from . import Winkelmand

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

def homeScreen(request):
    first_item = Product.objects.filter()
    return render(
        request,
        'product/Producten.html',
        {
            "producten": first_item,
            "User": request.user,
        }
    )
def addProduct(request):
    return render(
        request,
        'product/CreateProduct.html',
        {
            "User": request.user,
        }
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
            "User": request.user,
        }
    )
def productPagina(request, value):
    product = Product.objects.get(id= value)
    aantal = Winkelmand.getAantal(product)
    return render(
        request,
        "product/Product.html",
        {
            "product": product,
            "aantal" : aantal,
            "User": request.user,
        }
    )

def Winkelmandje(request):
        return render(
        request,
        "winkelmandje.html",
        {
            "Producten": Winkelmand.getItems(),
            "User": request.user,
        }
    )

#Dit is voor het inlog schrem
def loginUser(request):
    #hier moet denk een validatie voor komen

    return render(
        request,
        "authentication/login.html",
        {
            "User": request.user,
        }
    )

def LoginValidate(request):
    username = request.POST["username"]
    password = request.POST["password"]
    rememberMe = request.POST["remember"]
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        login(request, user)
        print("user is ingelogd")
        return redirect("/Producten")
    else:
        print("Inloggen niet gelukt")
        return redirect("/login")

def Register(request):
    return render(
        request,
        "authentication/register.html",
        {
            "User": request.user,
        }
    )
def RegisterUser(request):
    username = request.POST["username"]
    firstName = request.POST["firstname"]
    lastName = request.POST["lastname"]
    email = request.POST["email"]
    password = request.POST["password"]
    confirmPassword = request.POST["ConfPassword"]

    if(password==confirmPassword):
        user = User.objects.create_user(username, email , password)
        user.last_name = lastName
        user.first_name = firstName
        user.save()
        print("User is successvol aangemaakt")
        return redirect("/Producten")
    else:
        print("er is een fout opgetreden")
        return redirect("/register")

def Profile(request):
    if request.user.is_authenticated:
        return render(
            request,
            "authentication/Profile.html",
            {
                "User": request.user,
            }
        )
    else:
        return redirect("/login")

#Hier wordt het winkelmandje geprint
def Winkelmandje(request):
    return render(
        request,
        "winkelmandje.html",
        {
            "User": request.user,
            "Producten":  Winkelmand.getItems()
        }
    )
def addToWinkelmandje(request):
    productId = request.POST["productId"]
    aantal = request.POST["amount"]
    try:
        product= Product.objects.get(id=productId)
        Winkelmand.addOrUpdateItem(product,aantal)
    except:
        print("Product is niet gevonden")
    return redirect("/Producten")

#hier wordt het winkelmandje toegevoegd in de database
def addToDatabase(request):
    betaald = False
    try:
        betaald = request.POST["betaald"] == "on"
    except:
        betaald = False
    leverdatum = request.POST["leverdatum"]
    BestellingId = CreateBestelling(request,betaald, leverdatum)
    if(CreateOrderLines(BestellingId)):
        print("De bestelling staat in de database")
        Winkelmand.items.clear()
        return redirect("/Producten")
    return redirect("/winkelmandje")

def afrekenen(request):
    return render(
        request,
        "afrekenen.html",
        {
            "User": request.user,
        }
    )

#deze methode is voor het aanmaken van de bestelling
def CreateBestelling(request,betaald, leverdatum):
    try:
        factuurDatum = date.today()
        bestelling = Bestelling.objects.create(factuur_Datum= factuurDatum ,betaald=betaald, lever_Datum = leverdatum ,besteller= request.user  )
        bestelling.save()
        print("Bestelling is gemaakt")
        return bestelling
    except:
        return -1


def CreateOrderLines(bestelling):
        try:
            for item in Winkelmand.items:
                Orderline.objects.create(product = item[0], aantal = item[1], bestelling= bestelling)
                print("Orderline is gemaakt")
            return True
        except:
            print("er is een fout opgetreden in het maken van de orderlines")
            return False

def Bestellingen(request):
    print("Bestellingen")