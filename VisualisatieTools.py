import matplotlib.pyplot as plt

def maakStaafDiagram(x,y): 
    fig = plt.figure()
    ax = fig.add_axes([0.1,0.1,0.9,0.9])
    ax.bar(x,y)
    plt.show()

def MaakCircleDiagram(x,y):
    explode = (getZeroes(len(x)))  # only "explode" the 2nd slice (i.e. 'Hogs')

    fig1, ax1 = plt.subplots()
    ax1.pie(y, explode=explode, labels=x, autopct='%1.1f%%',
            shadow=True, startangle=90)
    ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

    plt.show()

def getZeroes(times):
    ret = [0.1]
    for i in range(times-1):
        ret.append(0)
    return ret

#Deze methode checkt of de array die genoemde shift bevat
def checkIfContains(catagorien,benodigd):
    positie=0
    for catagorie in catagorien:
        if(catagorie==benodigd):
            return positie
        positie+=1
    return -1

#Deze methode zet de array om in percentages
def MaakPercentages(data):
    totaal = 0
    enkelPercentage = 0
    ret = []

    #deze methode rekent het totaal uit
    for i in data:
        totaal+=i

    #deze methode berekend het percentage
    enkelPercentage = totaal/100
    for i in data:
        ret.append((i/enkelPercentage))
    return ret

def maakLabel(data):
    ret= ""
    for i in data:
        ret= ret , i