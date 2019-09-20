

import React, { Component } from 'react';
import "./item-cliente.css"

class ItemCliente extends Component{

    constructor(props){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleImgEditClick = this.handleImgEditClick.bind(this);
    }
   

    componentDidUpdate(){        
    }     

    componentWillUnmount(){
        console.info("ummont lista cliente");
    }

    handleImgEditClick(event){

        this.props.editarCliente(this.props.cliente);
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
    return  <li className="w3-bar w3-hover-red">
                 <div className="w3-row" style={{height: "40x"}}>                    
                    
                    <div className="w3-col coluna-imagem" onClick={this.handleOnClick}>
                        <img className="img-telefone" src={require("../img/phone.png")}></img>                    
                    </div>

                    <div className="w3-col coluna-texto" onClick={this.handleOnClick}>
                        <div className="w3-row">
                             <div className="w3-col s12">
                                <span className="w3-medium"> <b>{this.props.cliente.Telefone}</b></span>
                             </div> 
                             <div className="w3-col s12">
                                 <div className="w3-row">
                                    <div className="w3-col" style={{width:"80%"}}>
                                        <span className="w3-small">{this.props.cliente.Nome}</span>    
                                    </div>                                    
                                </div>
                             </div>  
                        </div>
                    </div>  
                    <div className="w3-col coluna-imagem">
                        <img className="img-edit" src={require("../img/edit.png")} onClick={this.handleImgEditClick}></img>                    
                    </div>                  
                </div> 
            </li>              
    }

}

export default ItemCliente;