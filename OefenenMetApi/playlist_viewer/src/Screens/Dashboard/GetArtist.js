import React, {useState} from "react";
import axios from "axios";
import Card from "./Components/Card";

function GetArtists(props) {
    const {token}  = props
    const [artists, setArtists] = useState([])
    const searchKey = "Bassie"

    const searchArtists = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
        
        setArtists(data.artists.items)
    }
    searchArtists()
    
    return artists.map(artist => (
        <Card
            id = {artist.id}
            img = {artist.images.length? artist.images[0].url:"Geen afbeelding"}
            name = {artist.name}
        />
    ))
}

export default GetArtists;