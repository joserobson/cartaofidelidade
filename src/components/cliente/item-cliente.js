

import React, { Component } from 'react';

class ItemCliente extends Component{

    constructor(props){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        
    }
   

    componentDidUpdate(){        
    }     

    componentWillUnmount(){
        console.info("ummont lista cliente");
    }

    handleOnClick(event){

        this.props.desmarcarClientes();
       
        let elementoSelecionado = event.target;
        if (!elementoSelecionado.classList.contains("w3-bar")){
            elementoSelecionado = elementoSelecionado.parentNode;
        }

        elementoSelecionado.classList.add("w3-red"); 
        this.props.setCliente(this.props.cliente);    
    }

  render(){
    return  <li className="w3-bar" onClick={this.handleOnClick}>
                <span className="w3-medium"> <b>Tel.:</b> {this.props.cliente.Telefone} - <b>CPF:</b>{this.props.cliente.Cpf}</span>
                <br></br>
                <span className="w3-small"><b>E-mail:</b> {this.props.cliente.Email}</span>
            </li>              
    }

}

export default ItemCliente;