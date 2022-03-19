import re
from urllib import response
from django.shortcuts import render
from django.utils.timezone import datetime
from django.http import HttpResponse

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

def home(request):
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