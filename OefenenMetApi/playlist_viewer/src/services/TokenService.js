import axios from "axios"

//De Token wordt gekeken of die in het systeem zit, anders wordt deze aangevraagd in deze window
function getToken(){
    const CLIENT_ID = 'd9a6aa78936649dca2a425e281c3d144'
    const REDIRECT_URI= "http://127.0.0.1:3000/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    let localToken = window.localStorage.getItem("token")

    if(localToken){
        return localToken
    }else{
        window.open(`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`, '_blank').focus();
    }
    return "Failed"
}
export default getToken;

