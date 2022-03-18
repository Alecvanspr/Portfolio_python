import random
def KiesWoorden(Lijst):
    lengte_array= len(Lijst)
    return Lijst[random.randint(0,lengte_array-1)]

def maakArray(string):
    ret = []
    for letter in string:
        ret.append(letter)
    return ret

def maakLegeArray(lengte):
    ret = []
    for i in range(lengte):
        ret.append('_')
    return ret

def ronde(woord):
    beurt = 5
    woordArray = maakArray(woord)
    geraden = maakLegeArray(len(woord))
    geraden[0] = woordArray[0]

    print('Het woord is ',len(woord),' tekens lang!')
    while(beurt!=0):
        print(geraden)
        invoer = input('Wat is uw volgende gok?')
        if(invoer==woord):
            beurt = 0
            print('Goed zo, je hebt het woord geraden')
            print('Het woord was ',woord)
        else:
            if(len(invoer)==len(woord)):
                count = 0
                for letter in invoer:
                    if(geraden[count]=='_'):
                        if(letter==woord[count]):
                            geraden[count] = letter
                    count+=1
                beurt-=1
            else:
                print("het woord is te lang of te kort")

#Dit is de main methode die gerunned gaat worden
def start():
    ronde(Woord_4_Letters)
    ronde(Woord_5_Letters)
    ronde(Woord_6_Letters)

Woorden_4_Letters = ['beer','kaas','post']
Woorden_5_Letters = ["poets",'appel','klaar']
Woorden_6_Letters = ['potten','bessen','mannen']

Woord_4_Letters= KiesWoorden(Woorden_4_Letters)
Woord_5_Letters = KiesWoorden(Woorden_5_Letters)
Woord_6_Letters = KiesWoorden(Woorden_6_Letters)

start()