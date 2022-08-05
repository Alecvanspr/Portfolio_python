import re
import datetime

items = []

def getItems():
    return items

#Deze methode is om snel te checken of het winkelmandje leeg is,
def isLeeg():
    if len(items)==0:
        return True
    return False


def addOrUpdateItem(product, aantal):
    if(getAantal(product)==0):
        addItem(product, aantal)
    else:
        updateItem(product, aantal)

#Hier wordt een object toegevoegd aan de lijst
def addItem(object, aantal):
    try:
        #De items worden hier als tupels toegevoegd aan de tijdelijke list
        items.append((object,aantal))
        print("Een item is aan het winkelmandje toegevoegd")
        return True
    except:
        print("er ging iets fout, het item is niet aan het winkelmandje toegevoegd")
        return False

#update item
def updateItem(object, aantal):
    try:
        pos = searchInList(object)
        items[pos] = (object, aantal)
        return True
    except:
        print("Er ging iets fout met het updaten,")
        return False

#Hier wordt een item ui de lijst gehaald op id
def removeItem(object,aantal):
    try:
        line = (object, aantal)
        items.remove(line)
        print("item is succesvol verwijderd")
        return True
    except:
        print("Er ging iets fout met het verwijderen van het object van de bestelling")
        return False


#hier wordt het product gezocht in de lijst
def searchInList(object):
    count =0
    for o in items:
        if o[0] == object:
            return count
        count+=1
    return -1

#hier kan je het aantal krijgen van de producten
def getAantal(product):
    try:
        for i in items:
            if(product == i[0]):
                print("Het item is gevonden")
                return i[1]
        print("Item is niet in de lijst")
        return 0
    except:
        print("er ging wat fout met het zoeken van het item")
        return False