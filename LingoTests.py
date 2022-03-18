import re
from unittest import TestCase,result
import unittest
from unittest.mock import Mock
from lingo import *

class Tests(TestCase):
    #dit is een simpele test zonder echt vee context.
    def TestKiesWoorden(self):
        MockArray = ["Woord1"]
        woord = KiesWoorden(MockArray)
        result = woord=="Woord1"
        self.assertTrue(result)