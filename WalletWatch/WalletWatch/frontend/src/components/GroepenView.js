import React, { Component } from "react";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';


import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
  } from "reactstrap";
  
  const iconList = Object
  .keys(Icons)
  .filter(key => key !== "fas" && key !== "prefix" )
  .map(icon => Icons[icon])

library.add(...iconList)

export default class GroepenOverzicht extends Component {
    constructor(props){
        super(props);
        this.state = {
            groepList:[],
            transactieList:[],
            showData:[],
        }
    }
        //check of de de lijst al is ingeladen
    componentDidMount() {
        this.refreshLists();
    }
    //zorgt ervoor dat alle groepen uit de api worden gehaald
    refreshLists = () => {
        axios
        .get("/api/Groeps/")
        .then((res) => this.setState({ groepList: res.data }))
        .catch((err) => console.log(err));
        axios
        .get("/api/Transactions/")
        .then((res) => this.setState({ transactieList: res.data }))
        .catch((err) => console.log(err));
    };


  //de groepen worden hier geladen
  renderGroepen(){
    const {showData} = this.state
    //hiermee wordt gezorgd dat de methode niet telkens opnieuw aangeroepen wordt
    if(showData.length===0){
      this.berekenWaardeGroepen()
    }
    return (
      <div>
        <table>
        <tr>
          <th className='col-1'></th>
          <th className='col-8'>Naam</th>
          <th className='col-2'>bedrag</th>
          <th className='col-1'></th>
          <th className='col-1'></th>
        </tr>
        {this.loadGroepen()}
      </table>
      </div>
  )
  }
  loadGroepen(){
    const {showData} = this.state

    return showData.map((item)=> (
        <tr>
            <td><FontAwesomeIcon icon={this.getGroep(item.id).icoon} /></td>
            <td>{this.getGroep(item.id).naam}</td>
            <td className={this.getColor(item.type)}>{item.bedrag}</td>
            <td><button className="btn btn-primary" onClick={this.editItem()}>Edit</button></td>
            <td><button className="btn btn-primary">Meer</button></td>
        </tr>
    ))
  }
  getColor(type){
    if(type==="Inkomsten"){
      return "Inkomsten-text"
    }else{
      return "Uitgaven-text"
    }
  }

//totale waarde van de groepen moet berekend worden
berekenWaardeGroepen(){
    const {transactieList} = this.state

    transactieList.forEach(transactie =>{
      this.addBedrag(transactie.groep,transactie.bedrag,transactie.type)
    })
}
//hier wordt het bedrag toegevoegd aan de showdata array
addBedrag(id,bedrag,type){
  const {showData} = this.state
  var isGroep = this.checkGroep(id)

  if(isGroep!=-1){
    /*
    hier wordt gekeken of het bedrag negatief of positief is, 
    als dat niet zo het geval is dan wordt het bijgetrokken of afgetrokken
    */
    if(type==showData[isGroep].type){
      showData[isGroep].bedrag+=bedrag
    }else{
      /*
      hier wordt het bedrag veranderd als het negatief is,
      Het type wordt veranderd naar het tegenovergestelde type,
      het bedrag is groter dan het originele bedrag, daarom wordt het oude bedrag
      er vanaf getrokken en het restand wordt opgeslagen
      */
      if(showData[isGroep].bedrag<bedrag){
        showData[isGroep].type = type
        showData[isGroep].bedrag = bedrag-showData[isGroep].bedrag
      }else{
        showData[isGroep].bedrag-=bedrag
      }
    }
  }else{
    showData.push({id, bedrag,type})
  }
}

//er wordt gecheckt of een groep al in de showdata lijst staat
checkGroep(id){
  const {showData} = this.state
  for(let count =0; count < showData.length; count++ ){
    //console.log(showData[count].id)
    if(showData[count].id===id){
      return count
    }
  }
  return -1
}
getGroep(id){
  const groep = this.state.groepList.find((groep)=> groep.id===id)
  return groep
}

  //zorgt ervoor dat deze methode wat terug geeft
  render(){
    return this.renderGroepen()
  }
}