import React from "react";

export default function Content(){
    return(
        <div className="Content">
            <form>
                <div className="form-fields">
                    <input placeholder="Upper text"></input>
                    <input placeholder="Bottom text"></input>
                </div>
                <button class="form-btn">Get a new meme image 🔥</button>
            </form>
            <img className="result-image" src="https://i.pinimg.com/originals/0f/25/ee/0f25ee2d869ef533343ffaed0b830712.jpg"></img>
        </div>
    )
}