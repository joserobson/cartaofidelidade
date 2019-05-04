import React, {Component} from 'react';

import {ClienteService} from '../../services/cliente-service';
import ListaDeClientes from './lista-clientes';
import Loading from '../loading/loading';
import TipoAlerta from "../modal/tipo-alerta";

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

    buscarClientes(){

        Loading.show();
             
        const resposta = ClienteService.ObterClientes(this.state.textoParaPesquisa);

        resposta.then((res)=>{
            
            Loading.close();

            if (res && res.length > 0){
                this.setState(state => ({                
                    clientes: res
                }));
                
                //this.props.setCliente(res[0]);
                
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

                        {this.state.clientes.length == 0 
                            ? <div className="w3-border w3-center">
                                <h6 className="w3-opacity">Lista de Clientes Vazia</h6>
                              </div>
                            : <ListaDeClientes setCliente={this.props.setCliente} clientes={this.state.clientes}></ListaDeClientes>
                        }                        
                        
                     </div>                 
                </div>
    }

    componentDidMount(){

        Loading.show();

        ClienteService.obterTopClientes()
        .then((topClientes)=>{
           
            if (topClientes.length > 0)
            {
                this.setState(state => ({                
                    clientes: topClientes
                }),()=>{
                    //this.props.setCliente(topClientes[0]);
                    Loading.close();
                }); 

                
            }
        });
    }

}

export default BuscarCliente;