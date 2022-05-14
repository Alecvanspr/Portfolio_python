import React from "react";

export default function Topic(props){
    return(
        <div className="ItemEnzo">
            <div className="card-image-box">
                <img className="card-img" src= {props.item.imageUrl} ></img>
            </div>
            <div className="Location">
                <h1>{props.item.name}</h1>
            </div> 

        </div>
    )
}