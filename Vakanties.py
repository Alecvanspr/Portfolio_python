from cmath import exp
from tabnanny import check
from turtle import pos, position
from VisualisatieTools import *

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


df = pd.ExcelFile("Data.xlsx")
data=df.parse("Vakanties")

def prijs_vakantieland():
    landen = []
    prijs_per_land = []
    count_bestemming_landen = []
    count = 0

    for land in data['Land']:
        position = checkIfContains(landen, land)
        if(position==-1):
            landen.append(land)
            prijs_per_land.append(data['Prijs'][count])
            count_bestemming_landen.append(1)
        else:
            prijs_per_land[position]+=data['Prijs'][count]
            count_bestemming_landen[position]+=1
        count+=1
    count = 0
    for land in landen:
        print(land,' :')
        print("Aantal bestemmingen : ",count_bestemming_landen[count])
        print('Gemiddelde prijs:',(prijs_per_land[count]/count_bestemming_landen[count]))
        count+=1


#Gemiddelde prijs van de vakantie
prijs_vakantieland()
#het vakantieland met de meeste bestemmingen

#De week dat het gemiddeld het goedkoopst is