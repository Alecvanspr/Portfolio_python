import React from "react";

export default function LoginButton({token,user,setToken, AUTH_ENDPOINT,CLIENT_ID,REDIRECT_URI, RESPONSE_TYPE}){
    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }
    return (!token ?
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
        : <button id="logout-btn" onClick={logout}>Logout</button>)
}