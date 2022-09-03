import axios from "axios";
import React, { useState } from "react";

export default function DisplayUserPlaylists(props){
    const URL = "https://api.spotify.com/v1/me"
    const {token} = props
    const[playlists,setPlaylists] = useState([])

    const getUser = async() => {
        const {data} = await axios.get(URL,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            params: {
                
            }
        })
        setPlaylists(data)
    }

    getUser()
    return(
        <h1>{playlists.display_name}</h1>
    )
}