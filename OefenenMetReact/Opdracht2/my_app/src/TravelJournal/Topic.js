import React from "react";

export default function Topic(props){
    return(
        <div className="ItemEnzo">
            <div className="card-image-box">
                <img className="card-img" src= {props.item.imageUrl} ></img>
            </div>
            <div classname="bericht">
                <div className="location">
                    <p classname="location-land">{props.item.location} | </p>
                    <a classname="location-googleMaps"> View on Google maps</a>
                </div>
                <div className="berict-content">
                    <h1 className="bericht-titel">{props.item.title}</h1> 
                    <p className="bericht-datum">{props.item.startDate} - {props.item.endDate}</p>
                    <p className="bericht-bericht">{props.item.description}</p>
                </div>
            </div>
        </div>
        
    )
}