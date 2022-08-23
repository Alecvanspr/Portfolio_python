import React, { Component } from "react";

export default class TransactionRow extends Component{
    constructor(props){
        super (props)
        this.state = {

        }
    }
      //geeft de kleur van het uitgegeven bedrag
    getTextColor = (type) => {
        if(type === "Inkomsten"){
        return "Inkomsten-text"
        }
        return "Uitgaven-text"
    }

    render(){
        const {item , editItem , handleDelete} = this.props
        return (
        <tr>
            <td></td>
          <td>{item.naam}</td>
          <td>{item.datum}</td>
          <td className={this.getTextColor(item.type)}>€{Math.round(item.bedrag)}</td>
          <td><button
            className="btn btn-secondary mr-2"
            onClick={()=> editItem(item)}
          >
            Edit
          </button></td>
          <td><button
            className="btn btn-danger"
            onClick={() => handleDelete(item)}
          >
            Delete
          </button></td>
        </tr>
        )
    }
}