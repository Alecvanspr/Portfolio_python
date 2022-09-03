import axios from "axios"
import getToken from './TokenService'

export default async function getUser(){
    let token = getToken()
    const {data} = await axios.get("https://api.spotify.com/v1/me",{
        headers:{
            Authorization: `Bearer ${token}`
        },
        params: {
        }
    })
    return data
}