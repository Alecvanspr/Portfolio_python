import openpyxl
import pandas as pd
import re
from .models import Bestelling

#TODOs
#methode voor het aanmaken van een generieke excelbestand
#methode voor het instellen van de basis elementen
#de methode voor het maken van de meegegeven elementen

#dit moet getest worden met behulp van intergratie in de webapp
path = filename='webshop/webshop/polls/excelBestanden/facturen/Test.xlsx'

def getTemplateWorkbook():
    return openpyxl.load_workbook(filename='webshop/webshop/polls/excelBestanden/facturen/Template.xlsx')

def zetVakje(vakje, data):
    try:
        workbook = getTemplateWorkbook()
        sheet = workbook.active
        sheet[vakje] = data
        return workbook
    except:
        print("er ging iets fout")
        return False

def setDefaultValues(bestellingId):
    bestelling = Bestelling.objects.get(id=bestellingId)
    workbook = getTemplateWorkbook()
    sheet = workbook.active
    #hier wordt de factuurdatum etc aangepast
    sheet['C21'] = bestelling.id
    sheet['F21'] = bestelling.factuur_Datum
    sheet['I21'] = bestelling.lever_Datum

    workbook.save(path)    

#Deze methode is tijdelijk voor het testen enzo
def SlaOp(fileNaam):
    print("Wek")



