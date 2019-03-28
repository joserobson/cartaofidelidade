

import React, { Component } from 'react';

class ItemCliente extends Component{

    constructor(props){
        super();

        console.log(props.cliente);
    }
   

    componentDidUpdate(){        
    }     

    componentWillUnmount(){
        console.info("ummont lista cliente");
    }

  render(){
    return  <li className="w3-bar">
                <span className="w3-medium"> <b>Tel:</b> {this.props.cliente.Telefone} - <b>CPF:</b>{this.props.cliente.Cpf}</span>
                <br></br>
                <span className="w3-small"><b>Email:</b> {this.props.cliente.Email}</span>
            </li>              
    }

}

export default ItemCliente;