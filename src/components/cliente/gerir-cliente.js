import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import {ClienteService} from '../../services/cliente-service';

import ListaDeClientes from './lista-clientes';
import Loading from '../loading/loading';
import TipoAlerta from "../modal/tipo-alerta";

class GerirCliente extends Component{
   
    constructor(props){
        super(props);
                
        this.state = {clientes: [], textoParaPesquisa: ''};               
        this.buscarClientes = this.buscarClientes.bind(this);
        this.handleChangePesquisa = this.handleChangePesquisa.bind(this);

    }

    handleChangePesquisa(event){
        this.setState({textoParaPesquisa: event.target.value});
    }


    buscarClientes(){

        Loading.show();
             
        debugger;
        const resposta = ClienteService.ObterClientes(this.state.textoParaPesquisa);

        resposta.then((res)=>{
            
            Loading.close();

            if (res && res.length > 0){
                this.setState(state => ({                
                    clientes: res
                }));   
            }else{

                this.setState(state => ({                
                    clientes: []
                })); 

                let mensagemModal = {
                    texto: 'Nenhum Cliente Foi Encontrado!!!',
                    tipo: TipoAlerta.WARNING
                }
        
                this.props.handleModal(mensagemModal);
            }     
        })        

        console.log("buscar clientes");
    }   

    componentWillUnmount(){
        console.info("ummont gerir cliente");
    }

    render(){        

        return <div className="w3-container" id="gerirCliente" style={{marginTop:'75px'}}>                
                   
                   <h1 className="w3-medium w3-text-black"><b>Busque e Selecione um Cliente:</b></h1>
                    <div className="w3-border">
                        <form className="w3-container">    
                            <div className="w3-row w3-section">
                                <div className="w3-col s11">
                                    <input className="w3-input w3-border" name="first" type="text" placeholder="Telefone ou CPF" onChange={this.handleChangePesquisa}/>
                                </div>
                                <div className="w3-col s1 w3-center" style={{paddingLef: '2px'}}>
                                    <i className="w3-xxlarge fa fa-search pointer" style={{cursor: 'pointer'}} onClick={this.buscarClientes}></i>
                                </div>
                            </div>    
                        </form>
                    </div>
                    <div style={{paddingTop: '3px'}}>                
                        <ListaDeClientes clientes={this.state.clientes}></ListaDeClientes>
                     </div>                 
                    <div style={{paddingTop: '10px'}}>                        
                        <Link className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" to="cadastrarCliente">Adicionar</Link>
                    </div>
            </div>               
    }
    
}

export default GerirCliente;

