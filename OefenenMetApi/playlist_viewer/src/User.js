import {useEffect, useState} from "react";
import axios from 'axios' 


//je kan de token opvragen met behulp van de window.localstorage
function CollectUser(props) {
    const CLIENT_ID = 'd9a6aa78936649dca2a425e281c3d144'
    const REDIRECT_URI= "http://127.0.0.1:3000/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    
    const [token, setThisToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setThisToken(token)
        props.setToken(token)
        window.sessionStorage.setItem("token",token)
    }, [])

    const logout = () => {
        setThisToken("")
        window.localStorage.removeItem("token")
    }    

    return (
            <div>
                {!token ?
                    <a className="sptisadasd" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button className="btn" onClick={logout}>Logout</button>}
                </div>
    )
}

export default CollectUser;