import re
import datetime

items = []

def getItems():
    return items

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

#update item
def updateItem(object, aantal):
    try:
        pos = searchInList(object)
        items[pos] = (object, aantal)
        return True
    except:
        print("Er ging iets fout met het updaten,")
        return False

def searchInList(object):
    count =0
    for o in items:
        if o[0] == object:
            return count
        count+=1
    return -1

#Voeg aan database doen mee met views class
    