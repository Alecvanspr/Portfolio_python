from codecs import backslashreplace_errors
from pyexpat import model
from statistics import mode
from django.db import models

# Create your models here.
#groepen geeft het karakter van de uitgifte weer
class Groep(models.Model):
    #naam van de groep
    naam = models.CharField(max_length=120, blank=False)
    #beschrijving van de groep
    beschrijving = models.CharField(max_length=120,blank=False)
    #icon van de groep
    icoon = models.CharField(max_length=500,blank=False)

#subgroep is er voor het makkelijker sorteren
class SubGroep(models.Model):
    #naam
    naam= models.CharField(max_length=120, blank=False)
    #beschrijving
    beschrijving = models.CharField(max_length=500, blank=False)
    #dit is bij welke groep hij hoort
    groep = models.ForeignKey(Groep, on_delete=models.DO_NOTHING, blank=False)

#transactie is de beweging van het geld
class Transactie(models.Model):
    #naam van de transactie
    naam = models.CharField(max_length=120, blank=False)
    #type van de transactie (Uitgave, inkomsten, sparen)
    type = models.CharField(max_length=120, blank=False)
    #datum van de transactie
    datum = models.DateField(blank=False)
    #Bedrag van de transactie
    bedrag = models.FloatField(blank=False)
    #opmerkingen over transactie
    opmerkingen = models.CharField(max_length=120, blank=True)
    #groep van de uitgaves
    groep = models.ForeignKey(Groep, on_delete=models.DO_NOTHING, blank=False)
    #Subgroep uitgiftes
    subgroep = models.ForeignKey(SubGroep,on_delete=models.DO_NOTHING, blank=True, default=None)
