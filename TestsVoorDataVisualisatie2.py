import re
from unittest import TestCase, result
import unittest
from TestDatavisualisatie2 import *
#om te tests the runnen moet je de volgende code invullen
#python -m pytest -v .\TestsVoorDataVisualisatie2.py
class TryTesting(TestCase):
    #Deze methode test of de checkIfContains methode klopt 
    def test_checkIfContainsTrue(self):
        fruitLijst = ["Appel","Peer", "Banaan"]
        fruit = "Appel"
        self.assertEqual(0,checkIfContains(fruitLijst,fruit))

    def test_checkIfContainsFalse(self):
        fruitLijst = ["Appel","Peer", "Banaan"]
        fruit = "Aardbei"
        self.assertEqual(-1,checkIfContains(fruitLijst,fruit))
    
    def test_MaakPercentages1(self):
        getallen = [25,30,20,25]
        verwachtResultaat = [25,30,20,25]
        result = MaakPercentages(getallen)
        self.assertEqual(verwachtResultaat,result)

    def test_MaakPercentages2(self):
        getallen = [50,60,40,50]
        verwachtResultaat = [25,30,20,25]
        result = MaakPercentages(getallen)
        self.assertEqual(verwachtResultaat,result)

    def testGetZeroes(self):
        expected = [1,0,0,0]
        result = getZeroes(4)
        self.assertEqual(expected,result)