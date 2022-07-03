import re
from unittest import TestCase, result
import unittest
import openpyxl
import pandas as pd

#Deze moet op deze manier geïmporteerd worden, in de classes moet het op een andere manier
import ExcelMaker

#Test met onderstaande regel
##python -m pytest -v .\polls\ExcelMakerTest.py
class test_excel(TestCase):
    def test_GetWorkbook(self):
        workbook = ExcelMaker.getTemplateWorkbook()
        self.assertNotEqual("Prenk ging fout", workbook )
        
    
    
