import React from "react";
import './Card.css';

export default function Card(props){
    const {id,img,naam, aantal} = props
    return (
        <div className="Card" key={id}>
            {img ? <img width={"100%"} src={img} alt=""/> : <div>No Image</div>}
            <div className="Card-content">
                <h1>{naam}</h1>
                <p>Aantal nummers :{aantal}</p>
                <p>Genre</p>
                <a>Meer...</a>
            </div>
        </div>
    )
}