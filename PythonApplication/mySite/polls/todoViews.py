import imp
import re
from urllib import request, response
from django.shortcuts import redirect, render
from django.utils.timezone import datetime
from django.http import Http404, HttpRequest, HttpResponse
from .models import TodoItem

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

def home(request):
    taken = TodoItem.objects.all()
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
    return render(
        request,
        "todo/edit.html",
        {
            "taak": taak,
        }
    )
def EditItem(request):
    place = request.POST['place']
    naam = request.POST['TaakNaam']
    datum = request.POST['datum']
    voltooid = request.POST['voltooid']
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