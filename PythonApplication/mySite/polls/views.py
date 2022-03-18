import re
from django.shortcuts import render
from django.utils.timezone import datetime
from django.http import HttpResponse

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

def homeScreen(request):
    return render(
        request,
        'Hello/HomeScreen.html'
    )

def home(request):
    return HttpResponse("Hello, Django!")

def hello_there(request, name):
    return render(
        request,
        'Hello/HelloThere.html',
        {
            'name': name,
            'date': datetime.now()
        }
    )

def PaginaMetVariabelen(request,Variabel1,Variabel2,Variabel3):
    if not Variabel1:
        Variabel1="Variabel1 is leeg"
    if not Variabel2:
        Variabel2 ="Variabel 2 is Leeg"
    if not Variabel3:
        Variabel3 = "Variabel 3 is leeg"
    Variabel1
    return render(
        request,
        "Hello/PaginaMetVariabelen.html",
        {
            'variabel1': Variabel1,
            'variabel2': Variabel2,
            'variabel3': Variabel3,
        }
    )
def PaginaMetLijst(request):
    employee_list = ["Bert","Gerda","Bertus","Alec"]
    return render(request, "Hello/PaginaMetLijst.html", {'employee_list': employee_list})
