from pyexpat import model
from django.db import models

# Create your models here.
class TodoItem(models.Model):
    taak = models.TextField(50)
    deadline = models.DateField()
    voltooid = models.BooleanField(default=False)