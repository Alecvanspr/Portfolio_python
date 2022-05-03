import React from "react";
import Star from "./img/Star 1.png"

export default function Card(props){
    return (
        <div className="card">
            <div className="card-image">
                <img className="card-image-img" src={require(`../Airbnb/img/${props.img}`)}></img>
                <div className="card-image-message">SOLD OUT</div>
            </div> 
            <div className="card-content">
                <div className="card-content-rating">
                    <img src={ Star } className="card-content-star"></img>
                    <p><b>{props.rating}</b> </p>
                    <p className="card-content-country"> ({props.reviewCount}) {props.country}</p>
                </div>
                <p>{props.title}</p>
                <p><b>From {props.price}</b>/person</p>
            </div>
        </div>
    )
}