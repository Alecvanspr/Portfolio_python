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
            subGroepList:[],
            showData:[],
            subgroepData:[],
            selectedGroep:0,
        }
    }
        //check of de de lijst al is ingeladen
    componentDidMount() {
        this.refreshList();
    }
    //zorgt ervoor dat alle groepen uit de api worden gehaald
    refreshList = () => {
      axios
        .get("/api/Transactions/")
        .then((res) => this.setState({ transactionList: res.data }))
        .catch((err) => console.log(err));
        axios
        .get("/api/Groeps/")
        .then((res) => this.setState({ groepList: res.data }))
        .catch((err) => console.log(err));
        axios
          .get("/api/Subgroeps/")
          .then((res) => this.setState({ subGroepList: res.data }))
          .catch((err) => console.log(err));
    };
    getTableHead(){
      return (        <tr>
        <th className='col-1'></th>
        <th className='col-8'>Naam</th>
        <th className='col-2'>bedrag</th>
        <th className='col-1'></th>
        <th className='col-1'></th>
      </tr>)
    }

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
        {this.getTableHead()}
        {this.loadGroepen(showData)}
      </table>
      </div>
  )
  }
  getViewList(){
    const {selectedGroep} = this.state
    const {viewPage} = this.props
      if(viewPage=="Groepen"){
        return this.state.groepList
    }else{
      return this.state.subGroepList.filter((item)=>(       
         item.groep == selectedGroep
      ))
    }
  }

  //hiermee wordt showdata gevuld
  fillShowData(){
    const {showData} = this.state
    const newList = this.getViewList()

    newList.forEach((groep)=>{
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
    const { showData,transactionList} = this.state
    const {viewPage} = this.props

    transactionList.forEach(transactie => {
      //Dit zorgt ervoor dat de groepen en subgroepen van elkaar gescheiden blijven
      let groepid = viewPage=="Groepen"? transactie.groep : transactie.subgroep
      let place = this.getPosition(groepid,showData)
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

  //Deze methode kan nu door 2 manier gebruikt worden
  loadGroepen(lijst){
    return lijst.map((item)=> (
        <tr>
            {this.loadIcoon(item.id)}
            <td>{this.getGroep(item.id).naam}</td>
            <td className={this.getColor(item.type)}>{item.bedrag}</td>
            <td><button className="btn btn-primary">Edit</button></td>
            {this.loadMeerBtn(item.id)}
        </tr>
    ))
  }
  loadMeerBtn(id){
    if(this.props.viewPage=="Groepen"){
      return(
      <td><button className="btn btn-primary" onClick={() => this.changeView(id)}>Meer</button></td>
      )
    }
    return <td></td>
  }
  loadIcoon(id){
    if(this.props.viewPage=="Groepen"){
      try{
      return(
        <td><FontAwesomeIcon icon={this.getGroep(id).icoon} /></td>
      )
      }catch(error){
        return(<td></td> )
      }
    }
    return(<td></td>)
  }

  changeView= (id)=>{
    this.setState({selectedGroep:id})
    this.setActiveGroup(id)
    this.displayCompleted() 
  }
  //deze methode zorgt ervoor dat alles net niet lekker laad
  displayCompleted(){
    const {displayCompleted} = this.props
    displayCompleted("subGroep")
  }
  setActiveGroup(id){
    const {setActiveGroup} = this.props
    setActiveGroup(id)
  }

  getColor(type){
    if(type==="Inkomsten"){
      return "Inkomsten-text"
    }else{
      return "Uitgaven-text"
    }
  }

  //met deze methode wordt gekeken waar een item zich bevind
  getPosition(id,lijst){
    for(let i =0; i<lijst.length; i++){
      if(lijst[i].id==id){
        return i
      }
    }
    return -1
  }

getGroep(id){
  const {viewPage} = this.props
  if(viewPage==="Groepen"){
    return this.state.groepList.find((groep)=> groep.id===id)
  }else{
    return this.state.subGroepList.find((groep)=> groep.id===id)
  }
}

  //zorgt ervoor dat deze methode wat terug geeft
  render(){
    const {viewPage } = this.props
    if(viewPage!="Groepen"){
      this.state.showData = []
    }
    return this.renderGroepen()
  }
}