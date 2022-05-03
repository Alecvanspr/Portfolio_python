import React from "react";
import image from "./img/Group 77.png"

export default function Hero(){
    return (
        <div className="hero">
            <div className="Canvas">
                <img src={image}></img>
            </div>
            <div className="title">
                <h1>Online Experiences</h1>
                <p>Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.</p>
            </div>
        </div> 
    )
}