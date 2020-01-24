import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import ListaModeloCartao from './lista-modelo-cartao';
import Loading from '../loading/loading';
import TipoAlerta from "../modal/tipo-alerta";
import {CartaoService} from '../../services/cartao-service';

class GerirModeloCartao extends Component{
   

    constructor(props){
        super(props);                
                
        this.state = {modelosCartoes: [], textoParaPesquisa: ''};               
       
        this.buscarModeloDeCartoes = this.buscarModeloDeCartoes.bind(this);
        this.handleChangePesquisa = this.handleChangePesquisa.bind(this);
        this.handleAtivarDesativar = this.handleAtivarDesativar.bind(this);
        this.setModeloCartao = this.setModeloCartao.bind(this);        
        
    }

    handleChangePesquisa(event){
        this.setState({textoParaPesquisa: event.target.value});
    }

    setModeloCartao(modeloCartao){
        this.setState({
            modeloCartao: modeloCartao
        });
    }

    handleAtivarDesativar(){

        if (this.state.modelosCartoes.length === 0 ){ 
    
            this.props.handleModal({
                texto: 'Lista de Modelos está Vazia',
                tipo: TipoAlerta.WARNING
            });    

            return;
        }

        //pegar o modelo selecionado em vermelho
       
        let modelo = this.state.modeloCartao;

        if (!modelo){
            modelo = this.state.modelosCartoes[0];
        }

        //setar status para ativado
        //chamar servicec para atualizar o modelo
        CartaoService.AtivarModeloCartao(modelo);        


        // let mensagemModal = {
        //     texto: 'Cartão Ativado com Sucesso!!!',
        //     tipo: TipoAlerta.SUCESS
        // }

        // this.props.handleModal(mensagemModal);

        this.buscarModeloDeCartoes();
    }

    buscarModeloDeCartoes(){

        Loading.show();
                     
        const resposta = CartaoService.ObterModeloDeCartoes(this.state.textoParaPesquisa);

        resposta.then((res)=>{
            
            Loading.close();

            if (res && res.length > 0){
                this.setState(state => ({                
                    modelosCartoes: res
                }));   
            }else{

                this.setState(state => ({                
                    modelosCartoes: []
                })); 

                let mensagemModal = {
                    texto: 'Nenhum Cartão Foi Encontrado!!!',
                    tipo: TipoAlerta.WARNING
                }
        
                this.props.handleModal(mensagemModal);
            }     
        })
    }
 

    render(){
        return <div className="w3-container" id="gerirCartao" style={{marginTop:'75px'}}>
                    <h1 className="w3-medium w3-text-black"><b>Busque e Selecione um Cartão:</b></h1>
                    <div className="w3-border">
                        <form className="w3-container">
                            <div className="w3-row w3-section">
                                <div className="w3-col s11">
                                    <input className="w3-input w3-border" name="first" type="text" placeholder="Nome do Cartão" onChange={this.handleChangePesquisa}/>
                                </div>
                                <div className="w3-col s1 w3-center" style={{paddingLeft: '2px'}}>
                                    <i className="w3-xxlarge fa fa-search"  style={{cursor: 'pointer'}} onClick={this.buscarModeloDeCartoes}></i>
                                </div>
                            </div>
                        </form>
                    </div>                
                    
                    <div style={{paddingTop: '3px'}}>                
                        <ListaModeloCartao 
                            modelosCartoes={this.state.modelosCartoes}
                            setModeloCartao={this.setModeloCartao}
                        >
                        </ListaModeloCartao>
                     </div>    
                        
                    <div style={{paddingTop: '10px'}}>
                        <button className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" onClick={this.handleAtivarDesativar}>Ativar/Desativar</button>                                                      
                        <Link className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" to="cadastrarModeloCartao">Adicionar</Link>              
                    </div>
                </div>                
    }

    componentDidMount(){
        //this.addEventoDestacarCartaoSelecionado();
    }
}

export default GerirModeloCartao;
