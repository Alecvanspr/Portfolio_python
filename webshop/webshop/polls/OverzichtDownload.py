from venv import create
from xmlrpc.client import DateTime
import openpyxl
import pandas as pd
import re
from .models import Bestelling, Orderline
import Path

#TODO
#Je kan een overzicht zien van alle bestellingen die zijn gedaan
#Je kan de ingrediënten zien van de producten die nodig zijn
#je kan het bestand downloaden

path = Path()