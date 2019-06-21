

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
    return  <li className="w3-bar w3-hover-red" onClick={this.handleOnClick}>
                 <div className="w3-row">
                    
                    <div className="w3-col s12">
                        <span className="w3-medium"> <b>Tel:</b> {this.props.cliente.Telefone}</span>
                        
                        <span className="w3-small"><b> Nome:</b> {this.props.cliente.Nome}</span>
                        <br></br>
                        <span className="w3-small"><b>E-mail:</b> {this.props.cliente.Email}</span>
                    </div>
                </div> 
            </li>              
    }

}

export default ItemCliente;