import React, {useState} from 'react'
import axios from 'axios'
import Card from './Components/Card'

function GetPlaylists(props) {
    const URL ="https://api.spotify.com/v1/me/top" 
    const {token}  = props
    const [playlists, setPlaylists] = useState([])
    const [filters, setFilters] = useState({
        naam:props.filters.naam,
        sorterenOp:props.filters.sorterenOp
    })

    const collectPlaylists = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
            }
        })
    
        setPlaylists(data.items)
    }

    collectPlaylists()
    console.log(filters)
    return playlists.map((playlist) => {
        if(playlist.name === (filters.naam)||filters.naam===""){
            return(
                <div key={playlist.id}>
                <Card 
                    img = {playlist.images[0].url}
                    naam = {playlist.name}
                    aantal = {playlist.tracks.total}
                />
                </div>
        )}
        return(null)
    })
}

export default GetPlaylists;