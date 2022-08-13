import React, { Component } from 'react';
import './App.css';
import Modal from "./components/Modal";
import axios from 'axios'
import { Table } from 'reactstrap';

/*
  App is het hoofd component van de aapplicatie, er wordt een state meegeven met daarin van alles wat van belang is voor het maken van de pagina
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: "all",
      transactionList: [],
      modal:false,
      activeItem: {
        naam: null,
        type: null,
        bedrag: 0.00,
        datum: "2002-03-26",
        opmerkingen:null,
        groep:1,
        subgroep:0,
      },
      groepList: [],
      subGroepList: [],
    };
  }
  //activeert het modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  //handelt het submitten van een nieuw ding
  handleSubmit = (item) => {
    this.toggle();
    var itemid = item.id
    //er wordt gekeken of het item een id heeft
    if(item.id) {
      axios.
        put('/api/Transactions/'+itemid+'/' ,item)
        .then((res) => this.refreshList());
        return;
    }
    //als dat niet het geval is wordt het doorgestuurd naar deze methode
    //dan wordt er een post gedaan om het nieuwe object te uploaden
    axios
      .post('api/Transactions/',item)
      .then((res) => {
        this.refreshList()
        console.log(res)})
      .catch(function (error){
        console.log(error)
      })
  };

  //handelt met een delete
  handleDelete = (item) => {
    axios
    .delete(`/api/Transactions/${item.id}/`)
    .then((res) => this.refreshList());
  };

  //Deze handelt met het aanmaken van een nieuw item
  createItem = () => {
      const item = {  
        naam: null,
        type:null,
        bedrag:0.00,
        datum: Date.now(),
        opmerkingen:"",
        groep:2,
        subgroep:3,
      };

      this.setState({ activeItem: item, modal: !this.state.modal });
    };

    //handelt met het bewerken van een item
    editItem = (item) => {
      this.setState({ activeItem: item, modal: !this.state.modal });
    };
  //check of de de lijst al is ingeladen
  componentDidMount() {
    this.refreshList();
  }
  //deze methode kan je aanroepen om de lijst te verversen
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

  //dit zorgt ervoord dat de status van de viewCompleted wordt veranderd naar het gewilde type
  displayCompleted = (status) => {
    return this.setState({ viewCompleted: status });
  };
  /*
    dit zorgt ervoor dat het menutje boven de lijst wordt gerenderd
  */
  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted("all")}
        >
          All
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted("Inkomsten")}
        >
          Inkomsten
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted("Uitgaven")}
        >
          Uitgaven
        </span>
      </div>
    );
  };

  //geeft de kleur van het uitgegeven bedrag
  getTextColor = (type) => {
    if(type == "Inkomsten"){
      return "Inkomsten-text"
    }
    return "Uitgaven-text"
  }

  //dit is het voor het maken van de regels in de tabel
  renderItems = () => {
    const { viewCompleted } = this.state;
    const { total } = this.state;
    //hieronder wordt gekeken of het type bestaat uit "all", anders worden alle transacties weergegeven
    const newItems = viewCompleted=="all" ? this.state.transactionList : (this.state.transactionList.filter(
      (item) => item.type == viewCompleted
      ))
      //dit is zodat hij op datum wordt gefilterd
      newItems.sort((item)=> item.datum)
    return newItems.map((item) => (
        <tr>
          <td>{item.naam}</td>
          <td>{item.datum}</td>
          <td className={this.getTextColor(item.type)}>€{item.bedrag}</td>
          <td><button
            className="btn btn-secondary mr-2"
            onClick={()=> this.editItem(item)}
          >
            Edit
          </button></td>
          <td><button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button></td>
        </tr>
    ));
  };
//het totaal wordt hier berekend
  getTotaal(){
    var totaal = 0
    this.state.transactionList.forEach(t => {
      if(t.type=="Inkomsten"){
        totaal += t.bedrag
      }else{
        totaal -= t.bedrag
      }
    });
    return "Totaal €"+totaal
  }


  //hier is het hoofddeel van de applicatie
  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Wallet watcher</h1>
        <div className="row">
          <div className="col-md-12 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className='row'>
                <div className="col-6">
                  <button
                    className="btn btn-primary"
                    onClick={this.createItem}
                  >
                    Add Transactie
                  </button>
                </div>
                <div className='col-4 text-right'>
                    <p className='h1' id="totaal">{this.getTotaal()}</p>   
                </div> 
              </div>
              {this.renderTabList()}
              <table>
                <tr>
                  <th>Naam</th>
                  <th>Datum</th>
                  <th>bedrag</th>
                  <th className='col-1'></th>
                  <th className='col-1'></th>
                </tr>
                {this.renderItems()}
              </table>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
