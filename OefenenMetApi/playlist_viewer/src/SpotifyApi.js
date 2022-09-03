/*
var redirect_uri = "https://localhost:3001/"; // change this your value
 

var client_id = ""; 
var client_secret = ""; // In a real app you should not expose your client_secret to the user

//Dit is voor het autorizen
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";

//Dit is voor de rest van de applicatie
const DEVICES = "https://api.spotify.com/v1/me/player/devices"
const FOLLOWING = "https://api.spotify.com/v1/me/top?type=profile&after=0I2XqVXqHScXjHhk6AYYRe&limit=10";
const LAATSTGELUISTERD ="https://api.spotify.com/v1/me/player/recently-played"

function onPageLoad(){
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if(window.location.search.length>0)
        handleRedirect();
}

//Hieronder is de code voor het inloggen en het authoriseren van spotify voor op de website
function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState("", "", redirect_uri); // remove param from url
}
//Hier wordt de code voor de url gemaakt en de code toegevoegd voor de toestemming van het systeem
function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

//Hier wordt een response gegeven in de vorm van een error
function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText + "er is iets fout gegaan");
    }
}

//Bij getCode() wordt de code opgevraagd die je krijgt bij het autoriseren van je spotify
//Dan wordt er een code in de URL weergegeven onder https//:website.com/code=AIsdbhasd
//Deze code wordt hier opgevraagd en omgezet naar een let
function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

//Dit vraagt de website op die toetstemming geeft voor het gebruik
//van spotify aan jou app
function requestAuthorization(){
    client_id = document.getElementById("clientId").value;
    client_secret = document.getElementById("clientSecret").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}
//Deze methode wordt aangeroepen als de token verloopt.
function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}



//Hierbij is method het type wat binnen komt. Dat kan dus een GET of POST zijn 
//De url en body spreken voor zich
//En de callback is een method die wordt meegegeven aan de methode
//Deze methode is verantwoordelijk voor het communiceren met de api
function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Accept','application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}



//Hieronder komt de code voor actions die worden uitgevoerd voor andere methods
//await ervan maken
//
function refreshDevices(){
    callApi( "GET", DEVICES, null, handleDevicesResponse );
}

//dit checkt of we geen error krijgen
//Als dat wel zo het geval is dan krijgen wij een andere uitvoer terug
function handleDevicesResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems( "devices" );
        data.devices.forEach(item => addDevice(item));
    }

    //401 betekend dat onze token is verouderd
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}
//Dit verwijderd alle items die zijn meegegeven
function removeAllItems( elementId ){
    let node = document.getElementById(elementId);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
//Dit voegt een bepaalde Device toe aan de list
function addDevice(item){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("devices").appendChild(node); 
}

//hieronder maken dat je het huidige nummer kan inzien.
function refreshLaatst(){
    var limit = document.getElementById("Aantal").value;
    callApi("GET", LAATSTGELUISTERD+"?limit="+limit, null, handleLaatstResponse);
}
function ClearLaatste(){
    const meme = document.getElementById("Geluisterd").innerHTML = "";
}

function handleLaatstResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        ClearLaatste();
        let geluisterdvalue = ""
        data.items.forEach(item =>{
            geluisterdvalue +="<div class='col-3'><img src='"+item.track.album.images[0].url+"'><h2>"+item.track.name+"</h2></div>"
        });
        document.getElementById("Geluisterd").innerHTML = geluisterdvalue;
        //item.track
    }

    //401 betekend dat onze token is verouderd
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        document.write(this.responseText)
        console.log(this.responseText);
        window.alert(this.responseText);
    }
}
//Dit voegt een bepaalde Device toe aan de list
function addLaatstGeluisterd(item){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("Laatste").appendChild(node); 
}
*/