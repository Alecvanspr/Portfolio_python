#https://towardsdatascience.com/how-to-work-with-excel-files-in-pandas-c584abb67bfb


from cmath import exp
from tabnanny import check
from turtle import pos
from VisualisatieTools import *

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


df = pd.ExcelFile("Data.xlsx")
data=df.parse("Food_Sales")

def SchadePerGeslacht():
    Schade_vrouwen = 0
    bedrag_vrouwen = 0
    Schade_mannen = 0
    bedrag_mannen = 0
    count = 0
    for x in data["Gender"]:
        if(x=="Male"):
            bedrag_mannen+=data["Incident Cost"][count]
            Schade_mannen+=1
        else:
            bedrag_vrouwen+=data["Incident Cost"][count]
            Schade_vrouwen+=1
        count+=1
    print("Aantal schade door mannen:",Schade_mannen)
    print("Aantal schade door vrouwen:",Schade_vrouwen)
    print("Het gemiddelde aantal schade van mannen is",(bedrag_mannen/Schade_mannen))
    print("Het gemiddelde aantal schade van vrouwen is",(bedrag_vrouwen/Schade_vrouwen))

#hier wordt de shift met de meeste schade berekend
def dienstMetMeesteSchade():
    shifts = []
    aantallen = []
    count = 0

    for dienst in data["Shift"]:
        positie = checkIfContains(shifts,dienst)
        if(positie==-1):
            shifts.append(dienst)
            aantallen.append(data["Incident Cost"][count])
        else:
            aantallen[positie]+=data["Incident Cost"][count]
        count+=1
    
    # Pie chart, where the slices will be ordered and plotted counter-clockwise:
    MaakCircleDiagram(shifts,MaakPercentages(aantallen))

def dagMetMeesteSchade():
    dagen = ['ma','di','wo','do','vr','za','zo']
    schade = [0,0,0,0,0,0,0]
    count = 0

    for dag in data["WkDay"]:
        positie = checkIfContains(dagen,dag)
        schade[positie]+=data["Incident Cost"][count]
        count+=1

    maakStaafDiagram(dagen,schade)
    MaakCircleDiagram(dagen,schade)



#Het gemiddelde schade per geslacht
#SchadePerGeslacht()

#Dienst met de gemiddelde schade in een pychart
#dienstMetMeesteSchade()

#op welke dag wordt er het meeste schade gereden in een week (Dit is leuk in een staaf diagram)
#dagMetMeesteSchade()
