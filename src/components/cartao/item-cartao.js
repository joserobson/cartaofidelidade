

import React, { Component } from 'react';

class ItemCartao extends Component{

    constructor(props){
        super(props);        
    }
   

    componentDidUpdate(){        
    }     

    componentWillUnmount(){
        console.info("ummont item cartao");
    }

  render(){
    return  <li className="w3-bar">
                <span className="w3-medium"> <b>Nome:</b> {this.props.cartao.Nome} - <b>Qtd Marcações:</b>{this.props.cartao.QtdMarcacoes}</span>
                <br></br>
                <span className="w3-small"><b>Benéficio:</b> {this.props.cartao.Beneficio}</span>
            </li>              
    }

}

export default ItemCartao;