import React, {useState} from "react";
import axios from "axios";

function GetArtists(props) {
    const URL ="https://api.spotify.com/v1/me/top" 
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
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
}

export default GetArtists;