import React, {Component} from 'react';

import {ClienteService} from '../../services/cliente-service';
import ListaDeClientes from './listar-cliente/lista-clientes';
import Loading from '../loading/loading';
import { UsuarioService } from '../../services/usuario-service';
import { NotificationHelper } from '../../helpers/notificacao-helper';
import { FiltroTelefoneRepositorio } from '../../repositorios/filtro-telefone-repositorio';

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
             
        const telefone = this.state.textoParaPesquisa;

        if (telefone.length < 4){
            NotificationHelper.ExibirAlerta('Forneça pelo menos 4 números para pesquisa');
            return;
        }

        Loading.show();

        const resposta = await ClienteService.ObterClientesPor(telefone);

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

                NotificationHelper.ExibirAlerta("Nenhum Telefone foi encontrado!!!");
            }
        }else{

            const erro = await resposta.json();            
            NotificationHelper.ExibirErro(erro.Message);
        }        
    }

    render(){
        return <div className="">                                        
                    <div className="">
                        <form className="">    
                            <div className="w3-row w3-section">
                                <div className="w3-col s11">                                    
                                    <input className="w3-input w3-border" name="first" type="text" placeholder="Telefone" value={this.state.textoParaPesquisa} onChange={this.handleChangePesquisa}/>
                                </div>
                                <div className="w3-col s1 w3-center" style={{paddingLef: '2px'}}>
                                    <i className="w3-xxlarge fa fa-search pointer" style={{cursor: 'pointer'}} onClick={this.buscarClientes}></i>
                                </div>
                            </div>    
                        </form>
                    </div>
                    <div style={{paddingTop: '3px'}} id="listaClientes">     

                        {this.state.clientes.length === 0 
                            ? <div className="w3-border w3-center">
                                <h6 className="w3-opacity">Lista de Clientes Vazia</h6>
                              </div>
                            : <ListaDeClientes 
                                setCliente={this.props.setCliente} 
                                clientes={this.state.clientes} 
                                editarCliente={this.props.editarCliente}>                                    
                              </ListaDeClientes>
                        }                        
                        
                     </div>                 
                </div>
    }

    async componentDidMount(){        

        console.log('did mount buscar-cliente');

        let telefonePesquisado = FiltroTelefoneRepositorio.ObterFiltroTelefone();
        if (telefonePesquisado){
            
            console.log('Telefone Pesquisado:', telefonePesquisado);
            this.setState({
                textoParaPesquisa: telefonePesquisado
            },()=>{
                this.props.handleValorDaPesquisa(telefonePesquisado);
                this.buscarClientes();
            });
                    
            FiltroTelefoneRepositorio.RemoverFiltroTelefone();
        }else{    

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
                NotificationHelper.ExibirErro(erro.Message);
            }     
        }  
    }

}

export default BuscarCliente;