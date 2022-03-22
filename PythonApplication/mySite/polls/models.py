from asyncio.windows_events import NULL
from django.db import models

# Create your models here.
class TodoItem(models.Model):
    #Een normale waarde
    taak = models.TextField(50)

    #Een waarde die null mag zijn
    omschrijving = models.TextField(600).null

    #Een waarde met een null
    deadline = models.DateTimeField().null

    #Een boolean waarde
    afgerond = models.BooleanField(False)
    
#Hier moet ook iets komen met foreign keys
#Hier moet dan ook wat komen voor Many to many relaties enzo