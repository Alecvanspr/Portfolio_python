from statistics import median_low
import time

koffies = ["1. Zwarte koffie","2. Cappuchino","3. Latte machiato"]
water = False

def Melktoevoegen(hoeveelheid):
    print("de melk wordt geklopt tot schuim")
    time.sleep(4)
    print("de melk wordt geklopt tot schuim")
    time.sleep(hoeveelheid/100)

def SchenkKoffie():
    time.sleep(2)
    print("De koffie gaat in de mok")


def WarmWater():
    print("het water wordt warm")
    time.sleep(2)
    print("Het water is aan het koken")
    time.sleep(2)
    print("het water is warm")
    water = True
    return True

def ZwarteKoffie():
    WarmWater()
    SchenkKoffie()
    print("De zwarte koffie is klaar")

def Cappuchino():
    WarmWater()
    SchenkKoffie()
    Melktoevoegen(2)
    print("De cappuchino is klaar")

def Latte_Machiato():
    WarmWater()
    SchenkKoffie()
    Melktoevoegen(4)
    print("De latte machiato is klaar")

def main():
    message = "Ik wil koffie"
    print(message)
    print("Welke zal ik nemen")
    
    for x in koffies:
        print(x)

    koffie = input()

    if(koffie==1):
        ZwarteKoffie()
    
    if(koffie==2):
        Cappuchino()
    else:
        Latte_Machiato()

main()