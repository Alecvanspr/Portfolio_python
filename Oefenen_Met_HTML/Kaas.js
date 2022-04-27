keer = 0
var veld = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

//Deze methode zorg ervoor dat de speler van beurt kan ververanderen
function beurt(id){
    if(checkBezet(id)&&!checkDrieOpEenRij()){
        kleurbeurt = "red"
        document.getElementById("message").innerHTML = "Het is de beurt van Groen"
        if(keer%2==0){
            kleurbeurt = "green"
            document.getElementById("message").innerHTML = "Het is de beurt van Rood"
        }
        vulveld(id,kleurbeurt)
        kleur(id,kleurbeurt)
        keer++
    }
    if(checkDrieOpEenRij()){
        endGame(kleurbeurt)
    }
    if(keer==9){
        document.getElementById("message").innerHTML = "Niemand heeft gewonnen"
        if(confirm("Niemand heeft gewonnen,\nWil je nog een potje spelen?")){
            reset()
        }
    }
}

//Deze methode is verantwoordelijk voor het invullen van de lijst
function vulveld(id,kleurbeurt){
    var speler = "X"
    if(kleurbeurt=="red"){
        speler="Y"
    }
    
    var locatie = getPlaats(id)
    veld[locatie[0]][locatie[1]] = speler
}

//Dit geeft de plaats in het veld terug
function getPlaats(id){
    var laatsteCijfer = (id.slice(-1))-1
    return [(Math.floor((laatsteCijfer)/3)),((laatsteCijfer)%3)]
}

//deze functie kijkt of het vakje al bezet is
function checkBezet(id){
    var coordinaten = getPlaats(id)
    var plaats = veld[coordinaten[0]][coordinaten[1]]
    if(plaats==0){
        return true
    }
    return false
}

//Deze methode die geeft ieder vakje een kleur
function kleur(id,kleur){
    var vakje = document.getElementById(id)
    vakje.style.backgroundColor = kleur
}
//Deze methode is verantwoordelijk voor het checken of er 3 op een rij is
function checkDrieOpEenRij(){
    //Deze checkt de lijn horizontaal
    for(let i = 0; i<3; i++){
        var rij = ""+veld[i][0]+veld[i][1]+veld[i][2]
        if(rij=="XXX"||rij=="YYY"){
            console.log("Horizontaal"+rij)
            return true
        }
    }

    //Deze lijn check verticaal
    for(let j = 0; j<3; j++){
        var rij = ""+veld[0][j]+veld[1][j]+veld[2][j]
        if(rij=="XXX"||rij=="YYY"){
            console.log("verticaal"+rij)
            return true
        }
    }

    //Deze lijn check kruislings
    schuineLijn = (""+veld[0][0]+veld[1][1]+veld[2][2])
    if(schuineLijn=="XXX"||schuineLijn=="YYY")
        return true
    schuineLijn = (""+veld[2][0]+veld[1][1]+veld[0][2])
    if(schuineLijn=="XXX"||schuineLijn=="YYY")
        return true

}
//Hier komt een einde spel methode
function endGame(kleur){
    document.getElementById("message").innerHTML = kleur + " heeft gewonnen"
    if(confirm(kleur+" heeft gewonnen!\nWil je nog een potje spelen?")){
        reset()
    }
}
//hiermee wordt het spel gereset
function reset(){
    veld = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    document.getElementById("vakje1").style.backgroundColor = "white"
    document.getElementById("vakje2").style.backgroundColor = "white"
    document.getElementById("vakje3").style.backgroundColor = "white"
    document.getElementById("vakje4").style.backgroundColor = "white"
    document.getElementById("vakje5").style.backgroundColor = "white"
    document.getElementById("vakje6").style.backgroundColor = "white"
    document.getElementById("vakje7").style.backgroundColor = "white"
    document.getElementById("vakje8").style.backgroundColor = "white"
    document.getElementById("vakje9").style.backgroundColor = "white"
    document.getElementById("message").innerHTML = "Groen mag beginnen"
    keer = 0
}