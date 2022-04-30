import re
from django.shortcuts import render

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# Create your views here.
def index(request):
    return render(request,'Opdracht1/index.html')