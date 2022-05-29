import re
from django.shortcuts import render
from django.utils.timezone import datetime
from django.http import HttpResponse
from .models import Product

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

def homeScreen(request):
    first_item = Product.objects.filter()
    return render(
        request,
        'product/Producten.html',
        {
            "producten": first_item,
        }
    )
def addProduct(request):
    return render(
        request,
        'product/CreateProduct.html'
    )
