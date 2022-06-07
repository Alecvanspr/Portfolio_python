import React from "react";
import Data from './Data';

export default function Content(){
    const [image, setImage] = React.useState()

    function getNewImage(){
        let position = Math.floor(Math.random() * Data.data.memes.length);
        let item = Data.data.memes[position]
        setImage(item.url)
    }
    function handleChange(event){
        console.log(event)
    }

    return(
        <div className="Content">
            <form>
                <h1 id="Test"></h1> 
                <div className="form-fields">
                    <input type="text" placeholder="Upper text" onChange={handleChange}></input>
                    <input placeholder="Bottom text"></input>
                </div>
                <a className="form-btn" onClick={ getNewImage }>Get a new meme image 🔥</a>
            </form>
            <img src={image} className="result-image"></img>
        </div>
    )
}