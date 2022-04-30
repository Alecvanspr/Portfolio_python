var keer = 0
var maxVeldGrootte = 0
let veldGrootte 
var veld = []

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
    if(keer==maxVeldGrootte){
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
    var laatsteCijfer = getLaatsteGetal(id,3)
    return [(Math.floor((laatsteCijfer)/veldGrootte)),((laatsteCijfer)%veldGrootte)]
}

//Deze geeft de laatste cijfer van een vakje terug
function getLaatsteGetal(id,LengteLaasteNummers){
    var laatsteCijfer = (id.slice(-LengteLaasteNummers))
    if(laatsteCijfer.includes('e')){
        return getLaatsteGetal(id,LengteLaasteNummers-1)
    }
    return laatsteCijfer
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
    vakje.classList.add(kleur)
}
//Deze methode is verantwoordelijk voor het checken of er 3 op een rij is
function checkDrieOpEenRij(){
    //Deze methode die werkt nog niet helemaal perfect
    for(let i = 0; i<veldGrootte; i++){
        var rijKruislings1 = ""
        var rijHorizontaal = ""
        var rijVerticaal = ""
        for(let j=0; j<veldGrootte; j++){
            rijHorizontaal += veld[i][j]
            rijVerticaal += veld[j][i]
            rijKruislings1 += veld [i][i]
        }
        if(rijHorizontaal.includes("XXX")||rijHorizontaal.includes("YYY")){
            console.log("Horizontaal"+rijHorizontaal)
            return true
        }
        if(rijVerticaal.includes("XXX")||rijVerticaal.includes("YYY")){
            console.log("verticaal"+rijVerticaal)
            return true
        }
        if(rijKruislings1.includes("XXX")||rijKruislings1.includes("YYY")){
            console.log("Kruislings"+ rijKruislings1)
            return true
        }
    }
    console.log(veld)
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
    veld = makeVeld()
    for(let i =1; i<=maxVeldGrootte; i++){
        vakje = "vakje"+i
        document.getElementById(vakje).className = "vakje"
    }
    document.getElementById("message").innerHTML = "Groen mag beginnen"
    keer = 0
}

function CreateVeld(Grootte){
    //Hiermee wordt de veldgrootte geinitialiseerd
    veldGrootte = Grootte
    maxVeldGrootte = Grootte * Grootte

    //Hiermee wordt het veld gerealiseerd
    veld = makeVeld()
    //Hiermee wordt het veld gevisualiseerd
    resizeVeld(Grootte)
}

function resizeVeld(Grootte){
    let veldCount = 1;
    veldText = ""
    for(let i = 0; i<Grootte; i++){
        var rij = "<div class='row'>"
        for(let j = 0; j<Grootte;j++){
            VakID = '"vakje'+veldCount+ '"'
            rij+="<div id="+VakID+" class='vakje' onclick='beurt("+VakID+")'></div>"
            veldCount++
        }
        rij+="</div>"
        veldText+=rij
    }
    document.getElementById("board").innerHTML= veldText
}

function makeVeld(){
    const NieuwVeld = []
    for(let i = 0; i<veldGrootte;i++){
        const AnderVeld = []
        for(let j = 0; j<veldGrootte; j++){
            AnderVeld.push(0)
        }
        NieuwVeld.push(AnderVeld)
    }
    return NieuwVeld
}