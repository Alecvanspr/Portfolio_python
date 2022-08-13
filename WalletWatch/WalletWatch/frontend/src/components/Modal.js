import React, { Component } from "react";
import axios from 'axios'

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

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      groepList: [],
      subGroepList: [],
      activeType: "",
      activeGroep: 0,
      activeSubGroep:0,
    };
  }
  //check of de de lijst al is ingeladen
  componentDidMount() {
    this.refreshLists();
    this.state.activeType = this.state.activeItem.type
    this.state.activeGroep = this.state.activeItem.groep
    this.state.activeSubGroep = this.state.activeItem.subgroep
  }
  //zorgt ervoor dat alle groepen uit de api worden gehaald
  refreshLists = () => {
    axios
      .get("/api/Groeps/")
      .then((res) => this.setState({ groepList: res.data }))
      .catch((err) => console.log(err));
    axios
      .get("/api/Subgroeps/")
      .then((res) => this.setState({ subGroepList: res.data }))
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

const TypeOpties = [
    {
      label: "Inkomsten",
      value: "inkomsten",
    },
    {
      label: "Uitgaven",
      value: "Uitgaven",
    },
]

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Transactie</ModalHeader>
        <ModalBody>
          <Form>           
            <FormGroup>
              <Label for="transactie-naam">Naam</Label>
              <Input
                type="text"
                id="transactie-naam"
                name="naam"
                value={this.state.activeItem.naam}
                onChange={this.handleChange}
                placeholder="Voer naam van transactie in"
                required={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="transactie-bedrag">Bedrag</Label>
              <Input
                type="number"
                step = {0.2}
                id="transactie-bedrag"
                name="bedrag"
                value={this.state.activeItem.bedrag}
                onChange={this.handleChange}
                placeholder="bedrag van transactie"
                required={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="transactie-type">Type transactie</Label>
              <select
                id="transactie-type"
                name="type"
                value={this.state.activeItem.type}
                onChange={this.handleChange}
              >
                {TypeOpties.map((option)=> (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="transactie-datum">Datum</Label>
              <Input
                type="Date"
                id="transactie-datum"
                name="datum"
                value={this.state.activeItem.datum}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="transactie-opmerking">Opmerkingen</Label>
              <Input
                type="text"
                id="transactie-opmerking"
                name="opmerkingen"
                value={this.state.activeItem.opmerkingen}
                onChange={this.handleChange}
                placeholder="Voer opmerkingen van transactie in"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="transactie-groep">Groep van de transactie</Label>
              <select
                id="transactie-groep"
                name="groep"
                onChange={this.handleChange}
              >
                {this.renderGroepen()}
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="transactie-subgroep">Subgroep van de transactie</Label>
              <select
                  id="transactie-subgroep"
                  name="subgroep"
                  onChange={this.handleChange}
              >
                {this.renderSubGroepen()}
              </select>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  setActiveGroep(groep){
    this.setState({activeGroep: groep.id })
  }
  setActiveSubGroep(SubGroep){
    this.setState({activeSubGroep:SubGroep.id})
  }

 renderGroepen= () => {
    const { groepList } = this.state
    const {activeItem} = this.state
    return groepList.map((groep) => {
        if(activeItem.groep==groep.id){
            return (
              <option
              value={groep.id} 
              onClick={() => this.setActiveGroep(groep)}
              selected
            >
              {groep.naam}</option>
            )
        }
        return (<option
          value={groep.id} 
          onClick={() => this.setActiveGroep(groep)}
        >
          {groep.naam}</option>
        )
    });
  }
  renderSubGroepen() {
    const {subGroepList} = this.state
    const {activeGroep} = this.state
    const {activeItem} = this.state

    const newlist = subGroepList.filter((item)=> item.groep === activeGroep);
    return newlist.map((groep) => {
        if(activeItem.subgroep==groep.id){
            return (
              <option
              value={groep.id} 
              onClick={() => this.setActiveSubGroep(groep)}
              selected
            >
              {groep.naam}</option>
            )
        }
        return (<option
          value={groep.id} 
          onClick={() => this.setActiveSubGroep(groep)}
        >
          {groep.naam}</option>
        )
        });
  }
}