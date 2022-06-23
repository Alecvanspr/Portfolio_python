import re
from unittest import TestCase, result
import unittest

#Deze moet op deze manier geïmporteerd worden, in de classes moet het op een andere manier
import Winkelmand

#Test met onderstaande regel
##python -m pytest -v .\polls\TestWinkelmandje.py
class test_product:
    naam = ""
    beschrijving = "Bed"
    prijs = ""
    image_URL = ""
    image_description = ""
    def __init__(self,naam, beschrijving, prijs ,image_URL , image_description):
        self.naam = naam,
        self.beschrijving = beschrijving,
        self.prijs = prijs,
        self.image_URL = image_URL,
        self.image_description = image_description
        

class TryTesting(TestCase):
# Create your tests here.
    #Hier wordt enkel een sting meegegeven
    def test_AddItemProduct(self):
        #hier wordt het winkelmandje schoon gemaakt
        Winkelmand.items.clear()

        expected_Naam = "Testproduct"
        expected_Aantal = 2
        expected = test_product(naam = expected_Naam, beschrijving = "Meme", prijs = "25",image_URL= "https://images0.persgroep.net/rcs/inNa6d_SRsUo0GRl9UwbMk5Z1Wc/diocontent/63534838/_crop/16/49/827/1154/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8", image_description="Afbeelding")
        
        #Hier wordt het product meegegeven aan de add item
        Winkelmand.addItem(expected, expected_Aantal)

        #hier wordt het eerste opject van het winkelmandje gepakt
        output = Winkelmand.items[0]

        #hier wordt de naam en het aantal vergeleken
        NaamItem = output[0].naam[0]
        aantal = output[1]

        #hier wordt gecheckt of het werkt
        self.assertEqual(expected_Naam,NaamItem)
        self.assertEqual(expected_Aantal, aantal)
    
    def test_removeItem(self):
        #arrange
        Winkelmand.items.clear()
        product = test_product(naam = "Product", beschrijving = "Meme", prijs = "25",image_URL= "https://images0.persgroep.net/rcs/inNa6d_SRsUo0GRl9UwbMk5Z1Wc/diocontent/63534838/_crop/16/49/827/1154/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8", image_description="Afbeelding")
        aantal = 17

        Winkelmand.items.append((product,aantal))

        #act
        output = Winkelmand.removeItem(product,aantal)

        self.assertTrue(output)
    
    def test_seachInList(self):
        #arrange
        Winkelmand.items.clear()
        product1 = test_product(naam = "Product1", beschrijving = "Meme", prijs = "25",image_URL= "https://images0.persgroep.net/rcs/inNa6d_SRsUo0GRl9UwbMk5Z1Wc/diocontent/63534838/_crop/16/49/827/1154/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8", image_description="Afbeelding")
        product2 = test_product(naam = "Product2", beschrijving = "Meme", prijs = "25",image_URL= "https://images0.persgroep.net/rcs/inNa6d_SRsUo0GRl9UwbMk5Z1Wc/diocontent/63534838/_crop/16/49/827/1154/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8", image_description="Afbeelding")
        product3 = test_product(naam = "Product3", beschrijving = "Meme", prijs = "25",image_URL= "https://images0.persgroep.net/rcs/inNa6d_SRsUo0GRl9UwbMk5Z1Wc/diocontent/63534838/_crop/16/49/827/1154/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8", image_description="Afbeelding")
        product4 = test_product(naam = "Product4", beschrijving = "Meme", prijs = "25",image_URL= "https://images0.persgroep.net/rcs/inNa6d_SRsUo0GRl9UwbMk5Z1Wc/diocontent/63534838/_crop/16/49/827/1154/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8", image_description="Afbeelding")
        Winkelmand.items.append((product1,2))
        Winkelmand.items.append((product2,5))
        Winkelmand.items.append((product3,22))
        
        #act
        pr1 = Winkelmand.searchInList(product1)
        pr3 = Winkelmand.searchInList(product3)
        pr4 = Winkelmand.searchInList(product4)
        
        #assert
        self.assertEqual(pr1, 0)
        self.assertEqual(pr3, 2)
        self.assertEqual(pr4, -1)
    
    def test_updateItem(self):
        #arrange
        Winkelmand.items.clear()
        product = test_product(naam = "Product", beschrijving = "Meme", prijs = "25",image_URL= "https://images0.persgroep.net/rcs/inNa6d_SRsUo0GRl9UwbMk5Z1Wc/diocontent/63534838/_crop/16/49/827/1154/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8", image_description="Afbeelding")
        Winkelmand.items.append((product, 2))
        expected = 4

        #act
        Winkelmand.updateItem(product, expected)
        outputProduct = Winkelmand.items[0]
        outputAantal = outputProduct[1]

        #assert
        self.assertEqual(expected,outputAantal)

    def test_getAantal(self):
        #arrange
        Winkelmand.items.clear()
        product = test_product(naam = "Product", beschrijving = "Meme", prijs = "25",image_URL= "https://images0.persgroep.net/rcs/inNa6d_SRsUo0GRl9UwbMk5Z1Wc/diocontent/63534838/_crop/16/49/827/1154/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8", image_description="Afbeelding")
        product2 = test_product(naam = "Product2", beschrijving = "Meme", prijs = "25",image_URL= "https://images0.persgroep.net/rcs/inNa6d_SRsUo0GRl9UwbMk5Z1Wc/diocontent/63534838/_crop/16/49/827/1154/_fitwidth/694/?appId=21791a8992982cd8da851550a453bd7f&quality=0.8", image_description="Afbeelding")
        expectedAantal = 4
        Winkelmand.items.append((product, expectedAantal))

        #act
        aantal = Winkelmand.getAantal(product)
        aantalLeeg = Winkelmand.getAantal(product2)

        #assert
        self.assertEqual(expectedAantal, aantal)
        self.assertEqual(0, aantalLeeg)