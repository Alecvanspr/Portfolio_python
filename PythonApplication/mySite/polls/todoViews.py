from datetime import date
import imp
import re
#door middel van picklen kan je bepaalde lists terug zetten naar de oorspronkelijke vorm
import pickle
from unittest import expectedFailure

from linq import Flow
from urllib import request, response
from django.shortcuts import redirect, render
from django.utils.timezone import datetime
from django.http import Http404, HttpRequest, HttpResponse
from .models import TodoItem


from django.contrib.staticfiles.urls import staticfiles_urlpatterns

def homeMethod(request):
    print("home method")
    taken = TodoItem.objects.all()
    return home(request,taken)

def orderby(request,orderby):
    taken = TodoItem.objects.all()
    try:
        taken = taken.order_by(orderby)
    except:
        print("er is iets anders ingevuld")
    return home(request,taken)

def zoek(request, zoek):
    taken = TodoItem.objects.filter(taak__contains=zoek)
    return home(request, taken)

def zoekEnFilter(request,orderby,zoek):
    taken = TodoItem.objects.filter(taak__contains=zoek)
    try:
        taken = taken.order_by(orderby)
    except:
        print("er is iets anders ingevuld")
    return home(request, taken)

#algemene home method
def home(request, taken):
    date = datetime.today().date()
    return render(
        request,
        'todo/Home.html',
        {
            "taken": taken,
            "date": date,
        }
    )
#verwijder een todo Item
def delete(request,place):
    taak = TodoItem.objects.get(id=place)
    return render(
        request,
        "todo/delete.html",
        {
            'taak':taak,
        }
    )
def deleteConfirm(request):
    place = request.POST['place']
    naam = request.POST['naam']
    taaknaam = TodoItem.objects.get(id=place)
    if(taaknaam.taak==naam):
        taaknaam.delete()
        return redirect("/todo/succes")
    else:
        return redirect("/todo/delete/{{ place }}")

#Voeg een nieuwe item toe
def addItem(request):

        return render(
        request,
        "todo/AddItem.html",
        {
            'opdracht': "Toegevoegd"
        }
    )
    
def add(request):
    naam = request.POST['naam']
    datum = request.POST['datum']
    TodoItem.objects.create(taak=naam, deadline=datum)
    return render(
        request,
        "todo/Success.html",
        {
            'opdracht': "Toegevoegd"
        }
    )
    
#bewerk een item
def edit(request,place):  
    taak = TodoItem.objects.get(id=place)
    datum = taak.deadline.strftime("%Y-%m-%d")
    return render(
        request,
        "todo/edit.html",
        {
            "taak": taak,
            "datum":datum,
        }
    )
def EditItem(request):
    place = request.POST['place']
    naam = request.POST['TaakNaam']
    datum = request.POST['datum']
    try:
        voltooid = request.POST['voltooid']
    except KeyError:
        voltooid = False
    
    #dit is een check om te kijken of het item wel bestaat
    try:
        TodoItem.objects.filter(id=place).update(taak=naam, deadline=datum, voltooid=voltooid)
    except TodoItem.DoesNotExist:
        return redirect("home")
    return redirect("/todo/succes")

def notFound(request):
    return render(
        request,
        "Shared/notfound.html"
    )
def succes(request):
    return render(
        request,
        "todo/Success.html",
    )