from calendar import isleap
from multiprocessing.connection import wait
from random import randint, random
from sys import displayhook
from turtle import delay, position
from numpy import equal
import pygame
import time

screenwidth = 800
screenheight = 600

veld = [[0 for x in range(3)]for y in range(3)]

#Deze methode maakt coordinaten naar de plek in de array
def ToPlaceInArray(pos):
    x = int(pos[0] / 266)
    y =int(pos[1] / 200)
    return (x,y)

#deze methode is verantwoordelijk voor het vullen van de array
def vulPositie(pos,splr):
    #dit is de berekening voor het vakje
    place = ToPlaceInArray(pos)
    if isLeeg(place):
        veld[place[0]][place[1]] = splr
    
#deze methode checkt of de aangegeven positie leeg is
def isLeeg(pos):
    return veld[pos[0]][pos[1]] == 0

#deze methode checkt of er 3 op een rij is
def isRij(user):
    #hier checkt de methode of er een shuine rij vol is
    if veld[1][1] == user:
        if veld[0][0] == user and veld[2][2] == user:
            return True
        elif veld[0][2]==user and veld[2][0] == user:
            return True

    #dit is voor het checken van de y as
    for i in range(3):
        if veld[i]==[user,user,user]:
            return True

        #dit is voor het checken van de X as
        xrij = [0 for x in range(3)]
        for j in range(3):
            xrij[j] = veld[j][i]
            if xrij == [user,user,user]:
                return True
        
    #Hij returned false als er geen volle rij is
    return False

#Deze methode levert een positie voor de bot
def getRandomPosition():
    beurt = True
    while beurt:
        x = randint(0,2)
        y = randint(0,2)
        if isLeeg((x,y)):
            beurt = False
    #dit is om ervoor te zorgen dat het er mooi uit ziet
    return (50+x*266,50+y*200)
# De 2 de speler


#een methode die bepaald waar de computer het ding neer zet
#dit is de beurt van iedere speler
def beurt(screen,pos,player):
    if player == 'x':
        screen.blit(pygame.image.load("game/kruisje01.png"),pos)
    else:
        screen.blit(pygame.image.load("game/rondje.png"),pos)
    vulPositie(pos,player)
    pygame.display.update()

def setText(screen, pos, text):
    font = pygame.font.SysFont('gotham',64)
    white = (255, 255, 255)
    black = (0, 0, 0 )
    text = font.render(text, True, black, white)
    textRect = text.get_rect()
    textRect.center = (pos[0]//2, pos[1]//2)
    screen.blit(text, textRect)
    pygame.display.update()


def Spel(screen):
#dit is voor het spel zelf
    running = True
    keer = 0
    while running:
        for event in pygame.event.get():
            if event.type == pygame.MOUSEBUTTONDOWN:
                mousepos = pygame.mouse.get_pos()
                if isLeeg(ToPlaceInArray(mousepos)):
                    beurt(screen,mousepos,"x")
                    if(isRij("x")):
                       setText(screen,(screenwidth,screenheight),"x heeft gewonnen")
                       time.sleep(5)
                       running = False
                    keer+=1
                    print(keer)
                    if event.type == pygame.QUIT or keer>9:
                       setText(screen,(screenwidth,screenheight),"Niemand heeft gewonnen")
                       time.sleep(5)
                       running = False
                    beurt(screen, getRandomPosition(), "o")
                    if(isRij("o")):
                       setText(screen,(screenwidth,screenheight),"O heeft gewonnen")
                       time.sleep(5)
                       running = False
                    keer+=1
                    print(keer)

def main():
    #Dit is voor de module
    pygame.init()
    # laad het logo

    logo = pygame.image.load("game/demo_logo.png")
    pygame.display.set_icon(logo)
    pygame.display.set_caption("Butter tjies en eks")

    #maak een scherm
    screen = pygame.display.set_mode((screenwidth,screenheight))

    #dit is voor de achtergrond van het spel
    background = pygame.image.load("game/achtergrond.png")
    screen.blit(background, (0,0))
    pygame.display.flip()
    
    Spel(screen)
    
if __name__=="__main__":
    # call the main function
    main()

