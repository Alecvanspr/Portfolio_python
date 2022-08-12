from django.shortcuts import render

from rest_framework import viewsets
from .serializers import *
from .models import Groep, Transactie

# Create your views here.

class TransactionView(viewsets.ModelViewSet):
    serializer_class = TransactieSerializer
    queryset = Transactie.objects.all()

class GroepView(viewsets.ModelViewSet):
    serializer_class = GroepSerializer
    queryset = Groep.objects.all()

class SubGroepView(viewsets.ModelViewSet):
    serializer_class = SubGroepSerializer
    queryset = SubGroep.objects.all()