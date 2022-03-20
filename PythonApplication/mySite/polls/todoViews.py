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

#Voeg een nieuwe item toe

#bewerk een item