import React from "react";
import "./Header.css"
import Foto from "./bassie_de_clown.PNG"

export default function Header(){
    return (
        <div className="HeadContent">
             <img src={ Foto }></img>
            <div className="InfoKop">
                <h1>Alec van Spronsen</h1>
                <p className="subtext">Frontend Developer</p>
                <a>Alecvanspr.nl</a>
            </div>
            <div className="SocialMediaKnoppen">
                <a className="btn btn-email">Email</a>
                <a className="btn  btn-linkedin">Linkedin</a>
            </div>
        </div>
    )
}