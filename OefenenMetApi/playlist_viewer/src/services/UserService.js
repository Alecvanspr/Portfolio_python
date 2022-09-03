import axios from "axios"

export default async function getUser(token){
    const {data} = await axios.get("https://api.spotify.com/v1/me",{
        headers:{
            Authorization: `Bearer ${token}`
        },
        params: {
        }
    })
    console.log(data)
    return data
}