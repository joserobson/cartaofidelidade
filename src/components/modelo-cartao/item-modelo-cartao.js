

import React, { Component } from 'react';

class ItemModeloCartao extends Component{

    constructor(props){
        
        super(props);
        
        this.handleOnClick = this.handleOnClick.bind(this);        
    }
   
    handleOnClick(event){

        this.props.desmarcarModeloCartao();
       
        let elementoSelecionado = event.target;
        if (!elementoSelecionado.classList.contains("w3-bar")){
            elementoSelecionado = elementoSelecionado.parentNode;
        }

        elementoSelecionado.classList.add("w3-red"); 
        this.props.setModeloCartao(this.props.modeloCartao);
    }

    componentDidUpdate(){        
    }         

    componentWillUnmount(){
        //console.info("ummont item cartao");
    }

    componentWillMount(props){
    }

    ativarModelo = () =>{
    
        this.setState({
            ativo: true
        });
      }

    render(){
        return  <li className="w3-bar" onClick={this.handleOnClick}>
                    <span className="w3-medium"> <b>Nome:</b> {this.props.modeloCartao.Nome} - <b>Qtd Marcações:</b> {this.props.modeloCartao.QtdMarcacoes}</span>
                    <br></br>
                    <span className="w3-small" style={{paddingRight:'20px'}}><b>Benéficio:</b> {this.props.modeloCartao.Beneficio}</span>
                    {this.props.modeloCartao.Ativo ? <span class="w3-tag w3-round-medium w3-amber w3-center">Ativo</span> : ''}
                </li>              
        }

}

export default ItemModeloCartao;