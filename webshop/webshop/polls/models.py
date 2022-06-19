from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    naam = models.CharField(max_length=30)
    beschrijving = models.TextField()
    prijs = models.DecimalField(max_digits=10, decimal_places=2)
    image_URL = models.URLField() 
    image_description = models.CharField(max_length=30, blank=True)
    def __str__(self) -> str:
       return super().__str__()

class Bestelling(models.Model):
    besteller = models.ForeignKey(User, on_delete=models.CASCADE)
    factuur_Datum = models.DateField()
    lever_Datum = models.DateField()
    betaald = models.BooleanField()
    def __str__(self) -> str:
       return super().__str__()
       
class Orderline(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    bestelling = models.ForeignKey(Bestelling, on_delete=models.CASCADE)
    aantal = models.IntegerField()
    def __str__(self) -> str:
       return super().__str__()

class DownloadLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    tijd = models.DateTimeField()
    def __str__(self) -> str:
       return super().__str__()