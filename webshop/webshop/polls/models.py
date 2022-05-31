from django.db import models

class Product(models.Model):
    naam = models.CharField(max_length=30)
    beschrijving = models.TextField()
    prijs = models.DecimalField(max_digits=10, decimal_places=2)
    image_URL = models.URLField() 
    image_description = models.CharField(max_length=30, blank=True)
    def __str__(self) -> str:
       return super().__str__()

class Gebruiker(models.Model):
    username = models.CharField(max_length=30)
    winkel = models.CharField(max_length=30)
    def __str__(self) -> str:
       return super().__str__()

class Bestelling(models.Model):
    besteller = models.ForeignKey(Gebruiker, on_delete=models.CASCADE)
    datum = models.DateField()
    def __str__(self) -> str:
       return super().__str__()
       
class Orderline(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    bestelling = models.ForeignKey(Bestelling, on_delete=models.CASCADE)
    aantal = models.IntegerField()
    def __str__(self) -> str:
       return super().__str__()