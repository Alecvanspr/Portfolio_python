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
            transactionList: [],
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
      .get("/api/Transactions/")
      .then((res) => this.setState({ transactionList: res.data }))
      .catch((err) => console.log(err));
      axios
      .get("/api/Groeps/")
      .then((res) => this.setState({ groepList: res.data }))
      .catch((err) => console.log(err));
    };

  //de groepen worden hier geladen
  renderGroepen(){
    const {showData} = this.state
    //hiermee wordt gezorgd dat de methode niet telkens opnieuw aangeroepen wordt
    if(showData.length===0){
      this.fillShowData()
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
  //hiermee wordt showdata gevuld
  fillShowData(){
    const {groepList,showData,} = this.state

    groepList.forEach((groep)=>{
      let id=groep.id
      var bedrag = 0.00
      var type = "Inkomsten"
      showData.push({id,bedrag,type})
    })
    if(this.fillBedragen()){
      return true
    }
  }

  //hier worden de bedragen van de showdata mee aangepast
  fillBedragen(){
    const { showData} = this.state
    const { transactionList } = this.state

    transactionList.forEach(transactie => {
      let place = this.getGroepPos(transactie.groep)
      if(place!=-1){
        if(showData[place].type===transactie.type){
          showData[place].bedrag+=transactie.bedrag
        }else{
          if(showData[place].bedrag<transactie.bedrag){
              var nieuwBedrag = transactie.bedrag-showData[place].bedrag
              showData[place].bedrag = nieuwBedrag
              showData[place].type=  transactie.type
          }else{
              showData[place].bedrag-=transactie.bedrag
          }
        }
      }
    });
    return true
  }

  loadGroepen(){
    const {showData} = this.state

    return showData.map((item)=> (
        <tr>
            <td><FontAwesomeIcon icon={this.getGroep(item.id).icoon} /></td>
            <td>{this.getGroep(item.id).naam}</td>
            <td className={this.getColor(item.type)}>{item.bedrag}</td>
            <td><button className="btn btn-primary">Edit</button></td>
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
  //met deze methode wordt gekeken waar een item zich bevind
  getGroepPos(id){
    const {showData} = this.state
    for(let i =0; i<showData.length; i++){
      if(showData[i].id==id){
        return i
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