import React, {Component} from 'react';

import {ClienteService} from '../../services/cliente-service';
import ListaDeClientes from './lista-clientes';
import Loading from '../loading/loading';
import TipoAlerta from "../modal/tipo-alerta";
import { UsuarioService } from '../../services/usuario-service';


class BuscarCliente extends Component
{

    constructor(props){
        super(props);
        
        this.state = {clientes: [], textoParaPesquisa: ''};               
        this.buscarClientes = this.buscarClientes.bind(this);
        this.handleChangePesquisa = this.handleChangePesquisa.bind(this);
    
    }

    handleChangePesquisa(event){
        
        this.setState({textoParaPesquisa: event.target.value});

        this.props.handleValorDaPesquisa(event.target.value);
    }

    async buscarClientes(){

        Loading.show();
             
        const resposta = await ClienteService.ObterClientes(this.state.textoParaPesquisa);

        Loading.close();

        if (resposta.ok){

            const clientesEncontrados = await resposta.json();

            if (clientesEncontrados && clientesEncontrados.length > 0){
                this.setState(state => ({                
                    clientes: clientesEncontrados
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
        }else{

            const erro = await resposta.json();

            let mensagemModal = {
                texto: erro.Message,
                tipo: TipoAlerta.WARNING
            }
    
            this.props.handleModal(mensagemModal);
        }        
    }

    render(){
        return <div className="">                    
                    <label className="w3-text-red"><b>Busque e clique no Cliente:</b></label>
                    <div className="">
                        <form className="">    
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

                        {this.state.clientes.length === 0 
                            ? <div className="w3-border w3-center">
                                <h6 className="w3-opacity">Lista de Clientes Vazia</h6>
                              </div>
                            : <ListaDeClientes setCliente={this.props.setCliente} clientes={this.state.clientes}></ListaDeClientes>
                        }                        
                        
                     </div>                 
                </div>
    }

    async componentDidMount(){

        Loading.show();

        let resposta = await ClienteService.obterTopClientes();

        Loading.close();
        
        if (resposta.ok){
            const topClientes = await resposta.json();

            if (topClientes.length > 0)
                {
                    this.setState(state => ({                
                        clientes: topClientes
                    }))
                }
        }else{

            if (resposta.status === 401){     
                
                UsuarioService.RemoverUsuarioLogado();
                window.location.reload();
            }

            const erro = await resposta.json();

            let mensagemModal = {
                texto: erro.Message,
                tipo: TipoAlerta.WARNING
            }
    
            this.props.handleModal(mensagemModal);
        }       
    }

}

export default BuscarCliente;