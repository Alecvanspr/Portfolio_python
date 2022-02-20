#https://towardsdatascience.com/how-to-work-with-excel-files-in-pandas-c584abb67bfb

from cmath import exp
from turtle import pos
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
    labels = shifts
    sizes = MaakPercentages(aantallen)
    explode = (getZeroes(len(shifts)))  # only "explode" the 2nd slice (i.e. 'Hogs')

    fig1, ax1 = plt.subplots()
    ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
            shadow=True, startangle=90)
    ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

    plt.show()

#Deze methode checkt of de array die genoemde shift bevat
def checkIfContains(catagorien,benodigd):
    positie=0
    for catagorie in catagorien:
        if(catagorie==benodigd):
            return positie
        positie+=1
    return -1

#Deze methode zet de array om in percentages
def MaakPercentages(data):
    totaal = 0
    enkelPercentage = 0
    ret = []

    #deze methode rekent het totaal uit
    for i in data:
        totaal+=i

    #deze methode berekend het percentage
    enkelPercentage = totaal/100
    for i in data:
        ret.append((i/enkelPercentage))
    return ret

def maakLabel(data):
    ret= ""
    for i in data:
        ret= ret , i
        
def getZeroes(times):
    ret=[0.1]
    for i in range(times-1):
        ret.append(0)
    return ret
#Het gemiddelde schade per geslacht
#SchadePerGeslacht()

#Dienst met de gemiddelde schade in een pychart
dienstMetMeesteSchade()


#op welke dag wordt er het meeste schade gereden in een week (Dit is leuk in een staaf diagram)

#Welke leeftijdsgroep maakt het meeste schade

#Wat is de meest voorkomende incident type
