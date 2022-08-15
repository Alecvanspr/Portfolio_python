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

export default class CustomGroepModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeItem: {
            naam:"",
            beschrijving:"",
            icoon:"",
          },
          groepList: [],
          subGroepList: [],
          activeType: "",
          activeGroep: 0,
          activeSubGroep:0,
        };
      }
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
    //deze methode is verantwoordelijk voor het gelijk verwerken van de datavelden
  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const {toggle, onSave } = this.props;

    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Groep Toevoegen</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="groep-naam">Naam</Label>
                        <Input
                        type="text"
                        id="groep-naam"
                        name="naam"
                        value={this.state.activeItem.naam}
                        onChange={this.handleChange}
                        placeholder="Voer de naam van de groep in"
                        required={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="groep-beschrijving">beschrijving</Label>
                        <Input
                        type="text"
                        id="groep-beschrijving"
                        name="beschrijving"
                        value={this.state.activeItem.beschrijving}
                        onChange={this.handleChange}
                        placeholder="Voer de beschrijving van de groep in"
                        required={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="groep-Icoon">Icoon</Label>
                        <Input
                        type="text"
                        id="groep-Icoon"
                        name="icoon"
                        value={this.state.activeItem.Icoon}
                        onChange={this.handleChange}
                        placeholder="Voer de icoontje van de groep in"
                        required={true}
                        />
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
    )
    //misschien een idee voor later, om de icoontjes te veranderen in select
  }
}