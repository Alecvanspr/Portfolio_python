import React from "react";
import logo from "./Airbnb.png"

export default function Header(){
    return (
            <nav className="nav nav-bar">
                    <img className="logo" src={ logo }></img>  
            </nav>
    )
}