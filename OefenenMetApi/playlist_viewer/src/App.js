import logo from './logo.svg';
import React, { useState , useEffect } from 'react';
import axios from 'axios' 

import './App.css';
import GetPlaylists from './Screens/Dashboard/GetItems';
import Filters from './Screens/Dashboard/Components/Filters';

function App(){

    const CLIENT_ID = 'd9a6aa78936649dca2a425e281c3d144'; // Your client id
    const REDIRECT_URI = "http://127.0.0.1:3000/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [user, setUser] = useState("")
    const [filters,setFilters] = useState({
        naam:"",
        sorterenOp:"naam",
    })

    //de User wordt gezet met deze methode, hierdoor kan je het id van de user krijgen met getUser
       const getUser = async (e) => {
        const {data} = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUser(data.id)
    }

    //Hieronder heb je nodig voor de authenticatie van de user
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])    

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }
    if(!user){
        getUser()
    }

    const checkedIn = () => {
        try{
            if(user){
                return (            
                    <GetPlaylists 
                        token = {token}
                        filters = {filters}
                    />
                )
            }
        }catch(e){
            console.log("Error is :", e)
        }
        return (<h1> log in</h1>)
    }
    const handleFilters = (nieuweFilters) => {
        console.log("Filters gezet")
        setFilters(nieuweFilters)
        console.log(filters)
    }
    const refreshDeck = () => {
        document.getElementById("main-deck").innerHTML()
    }

    //probeer dit op te splitten, misschien kan je code weghalen
    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify React</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button id="logout-btn" onClick={logout}>{user}</button>}
            </header>
            <Filters 
                handleFilters = {handleFilters}
            />
            <div id="main-deck" className='Deck'>
                {checkedIn()}
            </div>
        </div>
    );
}

export default App;
