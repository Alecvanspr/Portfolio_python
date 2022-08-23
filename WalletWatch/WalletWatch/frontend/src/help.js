import React, { Component } from "react";

export default class Help extends Component{
    //Bij deze methode kan je eventueel checks doen voordat je ze iets laat returnen
    geefVeelTerug(){
        let text = "hier kan je waarden nog een waarde geven"
        let classnaam = "De naam"
        return (
            <div className="classnaam">
                <h1>text</h1>
            </div>
        )
    }

    //Bij deze methode zeg je min of meer wat er al in de functie staat, en dat return je meteen al
    geefEnkelItemTerug =()=>(
        <div>
            <h1>Hier weet je meteen al wat je terug wil geven</h1>
        </div>
    );

    //De render zorgt ervoor dat de component iets teruggeeft.
    render(){
        <div>
            <h1 className="Help">Help</h1>
        </div>
    }
}