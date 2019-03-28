import React, { Component } from 'react';

import { Link } from 'react-router-dom'

class GerirCartao extends Component{
   

    constructor(props){
        super(props);

        this.handleAtivarDesativar = this.handleAtivarDesativar.bind(this);
    }


    handleAtivarDesativar(){

        let mensagemModal = {
            texto: 'Gerar Cartao',
            tipo: 'sucess'
        }

        this.props.handleModal(mensagemModal);
    }


    addEventoDestacarCartaoSelecionado(){
        var ulClientes = document.querySelectorAll("ul[id*=ulCartoes] li");
        ulClientes.forEach((element)=>{
            element.addEventListener("click", function(){
               
                ulClientes.forEach((element)=>{
                    if (element.classList.contains("w3-red")){
                        element.classList.remove("w3-red");
                    }
                });
                
                element.classList.add("w3-red");
                
          });
        }); 
    }    

    render(){
        return <div className="w3-container" id="gerirCartao" style={{marginTop:'75px'}}>
        
                     
                    <h1 className="w3-medium w3-text-black"><b>Busque e Selecione um Cartão:</b></h1>
                    <div className="w3-border">
                        <form className="w3-container">
                            <div className="w3-row w3-section">
                                <div className="w3-col s11">
                                    <input className="w3-input w3-border" name="first" type="text" placeholder="Nome"/>
                                </div>
                                <div className="w3-col s1 w3-center" style={{paddingLeft: '2px'}}>
                                    <i className="w3-xxlarge fa fa-search"></i>
                                </div>
                            </div>
                        </form>
                    </div>                
                        <div style={{paddingTop: '3px'}}>
                            <ul className="w3-ul w3-card-4" id="ulCartoes">
                                <li className="w3-bar w3-red">
                                    <div className="w3-row">
                                        <div className="w3-col s12 m12 l12">
                                            <span className="w3-medium"> <b>Nome:</b> Cartão A </span>
                                            <br/>
                                            <span className="w3-small"><b>Benefício:</b> Desconto de 10%</span>
                                        </div>
                                    </div>
                                    <div className="w3-row">
                                        <div className="w3-col s9 m9 l9">
                                            <span className="w3-small"> <b>Qtd Marcações:</b> 10</span>
                                        </div>
                                        <div className="w3-col s3 m3 l3 w3-right-align">
                                            <span className="w3-tag w3-round-medium w3-amber w3-center">Ativo</span>                                    
                                        </div>
                                    </div>
                                </li>
                                <li className="w3-bar">
                                    <div className="w3-row">
                                        <div className="w3-col s12 m12 l12">
                                            <span className="w3-medium"> <b>Nome:</b> Cartão Corte de Cabelo</span>
                                            <br/>
                                            <span className="w3-small"><b>Benefício:</b> Ganhe um corte de Cabelo</span>
                                        </div>
                                    </div>
                                    <div className="w3-row">
                                        <div className="w3-col s9 m9 l9">
                                            <span className="w3-small"> <b>Qtd Marcações:</b> 3</span>
                                        </div>
                                        <div className="w3-col s3 m3 l3 w3-right-align">
                                            <span className="w3-tag w3-round-medium w3-amber w3-center">Inativo</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <div style={{paddingTop: '10px'}}>
                            <button className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" onClick={this.handleAtivarDesativar}>Ativar/Desativar</button>                                                      
                            <Link className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" to="cadastrarCartao">Adicionar</Link>              
                        </div>
                </div>                
    }

    componentDidMount(){
        this.addEventoDestacarCartaoSelecionado();
    }
}

export default GerirCartao;

