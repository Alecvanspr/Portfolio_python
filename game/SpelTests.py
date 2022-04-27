from calendar import c
import imp
import unittest

import pytest
from Spel import *
from SpelTests import *
#om te tests the runnen moet je de volgende code invullen
#python -m pytest -v .\game\SpelTests.py

#deze methode is verantwoordelijk voor het legen van het veld
def leegVeld():
    for x in range(3):
        for y in range(3):
            veld[x][y]=0

class TestSpelClass(unittest.TestCase):
    def test_RoundCoords(self):
        inputValue = ToPlaceInArray((10,45))
        expected = (0,0)
        self.assertEqual(expected,inputValue)

        inputValue = ToPlaceInArray((544,300))
        expected = (2,1)
        self.assertEqual(expected,inputValue)

        inputValue = ToPlaceInArray((266,599))
        expected = (1,2)
        self.assertEqual(expected,inputValue)

        

    #deze methode test of de Leegveld methode werk()
    def test_leegveld(self):
        leegVeld()
        veld[1][2] = 'x'
        veld[2][1]= "O"
        #dit is om te checken of de veranderingen hebben plaatsgevonden
        self.assertEqual(0,veld[0][0])
        self.assertEqual("x",veld[1][2])
        self.assertEqual("O",veld[2][1])
        #hier leegt hij het veld
        leegVeld()
        #hier wordt geterst of het echt geleegd is
        self.assertEqual(0,veld[0][0])
        self.assertEqual(0,veld[1][2])
        self.assertEqual(0,veld[2][1])

    #deze methode checkt of de vulpositie werkt
    def test_vulpositie(self):
        leegVeld()
        x=1
        y=2
        speler = "x"
        self.assertEqual(0,veld[x][y])
        vulPositie((x*266,y*200),speler)
        self.assertEqual(speler,veld[x][y])
        
    def test_IsLeeg(self):
        leegVeld()
        #hier checkt hij of de 2 verschillende velden leeg zijn
        self.assertTrue(isLeeg((0,0)))
        self.assertTrue(isLeeg((2,2)))

    def test_Isgevuld(self):
        leegVeld()
        player = "x"
        x=2
        y=1
        veld[x][y] = player
        #hier checkt hij of het gevulde veld vol is
        self.assertFalse(isLeeg((2,1)))
        self.assertTrue(isLeeg((0,0)))
        

    #test de isRij methode
    def test_isRijTrueX(self):
        leegVeld()
        player = "x"
        veld[0][0] = player
        veld[0][1] = player
        veld[0][2] = player
        self.assertTrue(isRij(player))

    def test_isRijTrueY(self):
        leegVeld()
        player = "x"
        veld[0][0] = player
        veld[1][0] = player
        veld[2][0] = player
        self.assertTrue(isRij(player))

    def test_isRijTrueSchuin1(self):
        leegVeld()
        player = "x"
        veld[0][0] = player
        veld[1][1] = player
        veld[2][2] = player
        self.assertTrue(isRij(player))

    def test_isRijTrueSchuin1(self):
        leegVeld()
        player = "x"
        veld[2][0] = player
        veld[1][1] = player
        veld[0][2] = player
        self.assertTrue(isRij(player))

    #hier wordt getest of er geen false uitkomst komt
    def test_isRijFalse(self):
        leegVeld()
        player = "x"
        veld[1][0] = player
        veld[1][1] = player
        veld[0][2] = player
        self.assertFalse(isRij(player))  

#dit is zodat de main runned
if __name__ == '__main__':
    unittest.main()