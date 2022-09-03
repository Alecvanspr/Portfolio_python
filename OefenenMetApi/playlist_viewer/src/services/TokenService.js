import axios from "axios"

//De Token wordt gekeken of die in het systeem zit, anders wordt deze aangevraagd in deze window
const CLIENT_ID = 'd9a6aa78936649dca2a425e281c3d144'
const CLIENT_SECRET = 'ab76a647c8c94865bdbc37e6c5a4034e'
const redirect_uri= "http://127.0.0.1:3000/"
const RESPONSE_TYPE = "token"
const TOKEN = "https://accounts.spotify.com/api/token"
const AUTHORIZE = "https://accounts.spotify.com/authorize"
let access_token = ""
let refresh_token = ""

function onPageLoad(){
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
    body += "&client_id=" + CLIENT_ID;
    body += "&client_secret=" + CLIENT_SECRET;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

//Hier wordt een response gegeven in de vorm van een error
function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        console.log("Succes")
        var data = JSON.parse(this.responseText);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else{
        localStorage.setItem("token","")
        refreshAccessToken()
        
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
    localStorage.setItem("client_id", CLIENT_ID);
    localStorage.setItem("client_secret", CLIENT_SECRET); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + CLIENT_ID;
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
    body += "&client_id=" + CLIENT_ID;
    callAuthorizationApi(body);
}
function getToken(){
    onPageLoad()
    return localStorage.getItem("token")
}

export default getToken;

