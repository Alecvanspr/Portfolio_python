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
      activeGroep: ""
    };
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

  //hier moet een methode komen die alle groepen weergeeft,

  //hier moet een methode komen die alle subgroepen weergeeft

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
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
              />
            </FormGroup>
            <FormGroup>
              <Label for="transactie-type">Type transactie</Label>
              <select
                id="transactie-type"
                name="type"
              >
                <option value="Inkomsten">Inkomsten</option>
                <option value="Uitgaven">Uitgaven</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="transactie-datum">Datum</Label>
              <Input
                type="Date"
                id="transactie-datum"
                name="datum"
                value={this.state.activeItem.naam}
              />
            </FormGroup>
            <FormGroup>
              <Label for="transactie-opmerking">Opmerkingen</Label>
              <Input
                type="text"
                id="transactie-opmerking"
                name="opmerkingen"
                value={this.state.activeItem.naam}
                onChange={this.handleChange}
                placeholder="Voer opmerkingen van transactie in"
              />
            </FormGroup>
            <FormGroup>
              <Label for="transactie-groep">Groep van de transactie</Label>
              <select
                id="transactie-groep"
                name="groep"
              >
                {this.renderGroepen()}
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="transactie-groep">Groep van de transactie</Label>
              <select
                id="transactie-groep"
                name="groep"
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
  renderGroepen= () => {
    const { groepList } = this.state
    return groepList.map((groep) => (
      <option value={groep.id} onClick={this.setActiveGroep(groep)}>{groep.naam}</option>
    ));
  }
  setActiveGroep(groep){
    this.setState({activeGroep: groep })
  }
  renderSubGroepen() {
    const {subGroepList} = this.state
    const activeGroep = this.state.activeGroep
    console.log(activeGroep)
    const newlist = subGroepList.filter((item)=> item.groep == activeGroep);
    return newlist.map((groep) => (
      <option value="item">{groep.naam}</option>
    ));
  }
}