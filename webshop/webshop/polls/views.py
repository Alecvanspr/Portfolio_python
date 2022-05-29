import re
from django.shortcuts import render
from django.utils.timezone import datetime
from django.http import HttpResponse

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

def homeScreen(request):
    return render(
        request,
        'product/Producten.html'
    )
def addProduct(request):
    return render(
        request,
        'product/CreateProduct.html'
    )
