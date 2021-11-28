import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time
from dict import options

class PythonOrgSearch(unittest.TestCase):

        def setUp(self):
                self.driver = webdriver.Chrome("C:\Program Files (x86)\chromedriver.exe") #path webdriver archive
                self.driver.get("https://hytech-cesar.sagittax.org/") #The site

        def test_get_professor_contacts(self):
                contacts = ["contact-slack","contact-email","contact-whatsapp","contact-preferencial"]
                element = WebDriverWait(self.driver, 100).until(
                        EC.presence_of_element_located((By.ID, "select-contacts"))
                )
                element.click()

                count_cursos = 1
                for curso in options:

                        element = WebDriverWait(self.driver, 100).until(
                                EC.presence_of_element_located((By.ID, curso))
                        )
                        element.click()

                        count_periods = 1
                        for periodo in options[curso]:
                                
                                try:
                                        element = WebDriverWait(self.driver, 100).until(
                                                EC.presence_of_element_located((By.ID, periodo))
                                        )
                                        element.click()
                                except:
                                        time.sleep(5)
                                        element.click()

                                count_professor = 1
                                for professor in options[curso][periodo]:
                                        element = WebDriverWait(self.driver, 100).until(
                                                EC.presence_of_element_located((By.ID, professor))
                                        )
                                        element.click()

                                        for i in range(4):
                                                element = WebDriverWait(self.driver, 100).until(
                                                        EC.presence_of_element_located((By.ID, contacts[i]))
                                                )
                                                self.assertEqual(options[curso][periodo][professor][i], element.text, f"-------------------- ERRO --------------------\nOpcao: Contatos - Curso: {curso} - Periodo: {periodo} - Professor: {professor}\nExpected: {options[curso][periodo][professor][i]}\nActual: {element.text}")
                                                #assert options[curso][periodo][professor][i] == element.text

                                        if count_professor < len(options[curso][periodo]):
                                                self.driver.refresh()
                                                
                                                element = WebDriverWait(self.driver, 100).until(
                                                        EC.presence_of_element_located((By.ID, "select-contacts"))
                                                )
                                                element.click()

                                                element = WebDriverWait(self.driver, 100).until(
                                                        EC.presence_of_element_located((By.ID, curso))
                                                )
                                                element.click()

                                                try:
                                                        element = WebDriverWait(self.driver, 100).until(
                                                                EC.presence_of_element_located((By.ID, periodo))
                                                        )
                                                        element.click()
                                                except:
                                                        time.sleep(5)
                                                        element.click()

                                        count_professor+=1

                                if count_periods < len(options[curso]):
                                        self.driver.refresh()
                                                
                                        element = WebDriverWait(self.driver, 100).until(
                                                EC.presence_of_element_located((By.ID, "select-contacts"))
                                        )
                                        element.click()

                                        element = WebDriverWait(self.driver, 100).until(
                                                EC.presence_of_element_located((By.ID, curso))
                                        )
                                        element.click()

                                count_periods+=1

                        if count_cursos < len(options):
                                self.driver.refresh()
                                                
                                element = WebDriverWait(self.driver, 100).until(
                                        EC.presence_of_element_located((By.ID, "select-contacts"))
                                )
                                element.click()

                        count_cursos+=1
        
        def tearDown(self):
            self.driver.close()

if __name__ == "__main__":
        unittest.main()