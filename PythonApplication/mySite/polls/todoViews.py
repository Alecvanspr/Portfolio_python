import imp
import re
from urllib import response
from django.shortcuts import render
from django.utils.timezone import datetime
from django.http import HttpResponse
from .models import TodoItem

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

def home(request):
    taken = TodoItem.objects.all()
    return render(
        request,
        'todo/Home.html',
        {
            "taken": taken,
        }
    )

#verwijder een todo Item
def delete(request,place):
    if int(place) > TodoItem.objects.count():
        return notFound(request)   
    taak = TodoItem.objects.get(id=place)
    return render(
        request,
        "todo/delete.html",
        {
            'taak':taak,
        }
    )
def notFound(request):
    return render(
        request,
        "Shared/notfound.html"
    )

#Voeg een nieuwe item toe

#bewerk een item