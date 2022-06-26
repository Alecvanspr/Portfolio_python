function add(){
    let waarde = document.getElementById("Kwantiteit-veld").value
    document.getElementById("Kwantiteit-veld").value = parseInt(waarde)+1
}

function remove(){
    let waarde = document.getElementById("Kwantiteit-veld").value
    if(waarde>0){
        document.getElementById("Kwantiteit-veld").value = parseInt(waarde)-1
    }
}

function changeTotaalVeld(prijs, veld){
    aantal = document.getElementById("veld"+veld).value
    let Totaalprijs = parseInt(prijs) * parseInt(aantal)
    document.getElementById("totaalPrijs"+veld).innerHTML = "€"+ Totaalprijs + ",-"
}