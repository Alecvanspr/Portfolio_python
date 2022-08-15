from rest_framework import serializers
from .models import *

class TransactieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactie
        fields = ('id', 'naam','type','datum','bedrag','opmerkingen','groep','subgroep')

class GroepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groep
        fields = ('id', 'naam', 'beschrijving','icoon')

class SubGroepSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubGroep
        fields = ('id', 'naam', 'beschrijving','groep')