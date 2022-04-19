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
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate , logout

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

#dit is de home methode
def homeMethod(request):
    zoekTerm = getOrNull(request,'zoek')
    sorteren = getOrNull(request,'filter')
    taken = sorteer(sorteren,zoek(zoekTerm))
    return home(request,taken,zoekTerm, sorteren)

#Deze methode kijkt of een get leeg is, als dat het geval is, dan wordt er niks gereturned
#deze methode is open closed doordat je hiermee wel steeds kan uitbreiden
def getOrNull(request,getItem):
    try:
        ret = request.GET[getItem]
    except:
        ret = ""
        print("error")
    return ret

#methode voor een lijst voor het zoeken
def zoek(zoek):
    if zoek is None:
        zoek=""
    return TodoItem.objects.filter(taak__contains=zoek)

#een methode voor de lijst met het sorteren
def sorteer(sorteren, lijst):
    if sorteren is None:
        sorteren="id"
    try:
        lijst = lijst.order_by(sorteren)
    except:
        print("er is iets anders ingevuld")
    return lijst
    
def getUser(request):
    try:
        return request.user.username
    except:
        return ""

#algemene home method
def home(request, taken,zoek, orderby):
    date = datetime.today().date()
    return render(
        request,
        'todo/Home.html',
        {
            "username" : getUser(request),
            "orderby": orderby,
            "zoek": zoek,
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

#Hieronder heeft betrekking tot het inloggen
def LoginHome(request):
    return render(
        request,
        "Login/Home.html"
    )
def Login(request):
    username = request.POST['Email']
    password = request.POST['password']
    user = authenticate(request, username=username,password=password)
    if user is not None:
        login(request, user)
        print("succes")
        return redirect("/todo/succes")
    else:
        print("gefaald")
        return redirect("/login")

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'login/Register.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect("/todo/succes")
