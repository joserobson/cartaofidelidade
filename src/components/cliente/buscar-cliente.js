import React, {Component} from 'react';

import {ClienteService} from '../../services/cliente-service';
import ListaDeClientes from './listar-cliente/lista-clientes';
import Loading from '../loading/loading';
import { UsuarioService } from '../../services/usuario-service';
import { NotificationHelper } from '../../helpers/notificacao-helper';
import { FiltroTelefoneRepositorio } from '../../repositorios/filtro-telefone-repositorio';
import { HttpServiceHelper } from '../../helpers/http-service-helper';
import { RepositorioFactory } from '../../util/repositorio-factory';
import { UsuarioRepositorio } from '../../repositorios/usuario-repositorio';

class BuscarCliente extends Component
{

    constructor(props){
        super(props);
        
        this.state = {clientes: [], textoParaPesquisa: ''};               
        this.buscarClientes = this.buscarClientes.bind(this);
        this.handleChangePesquisa = this.handleChangePesquisa.bind(this);
        this.reiniciarBusca = this.reiniciarBusca.bind(this);
    }

    handleChangePesquisa(event){
        
        this.setState({textoParaPesquisa: event.target.value});

        this.props.handleValorDaPesquisa(event.target.value);
    }

    async reiniciarBusca(){

        this.setState({textoParaPesquisa: ''});

        await this.obterTodosClientes();
    }

    async buscarClientes(){        
             
        
        const telefone = this.state.textoParaPesquisa;

        if (telefone.length < 4){
            NotificationHelper.ExibirAlerta('Forneça pelo menos 4 números para pesquisa');
            return;
        }        

       
        //teste buscar cliente
        const repo = await RepositorioFactory.getClienteRepositorio();
        const clientesEncontrados = await repo.obterPorTelefone(telefone);

        //console.log('clientes encontrados busca por telefone',clientesEncontrados);
        
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
            


        // const resposta = await HttpServiceHelper.InvocarServico(()=>{
        //     return ClienteService.ObterClientesPor(telefone);
        // })        

        // if (resposta.ok){

        //     const clientesEncontrados = await resposta.json();

        //     if (clientesEncontrados && clientesEncontrados.length > 0){
        //         this.setState(state => ({                
        //             clientes: clientesEncontrados
        //         })); 
        //     }else{
        //         this.setState(state => ({                
        //             clientes: []
        //         })); 

        //         NotificationHelper.ExibirAlerta("Nenhum Telefone foi encontrado!!!");
        //     }
        // }            
    }

    render(){
        return <div className="">                                        
                    <div className="">
                        <form className="">    
                            <div className="w3-row w3-section">
                                <div className="w3-col s10">                                    
                                    <input className="w3-input w3-border" name="first" type="text" placeholder="Telefone" value={this.state.textoParaPesquisa} onChange={this.handleChangePesquisa}/>
                                </div>
                                <div className="w3-col s2 w3-center" style={{paddingLeft: '2px'}}>
                                    <div className="w3-row">
                                         <div className="w3-col s12">
                                            <i className="w3-xxlarge fa fa-search pointer" style={{cursor: 'pointer'}} onClick={this.buscarClientes}></i>                                            
                                        </div>        
                                        {/* <div className="w3-col s6">
                                            <i className="w3-xxlarge fa fa-refresh pointer" style={{cursor: 'pointer'}} onClick={this.reiniciarBusca}></i>                                    
                                        </div> */}
                                    </div>     
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

    async obterTodosClientes(){

      Loading.show();

        const repo = await RepositorioFactory.getClienteRepositorio();
          let clientes = await repo.listaTodos();

          if (clientes.length === 0) {
            
            let resposta = await HttpServiceHelper.InvocarServico(() => {
              return ClienteService.ObterClientesDoUsuarioLogado();
            });

            if (resposta.ok) {

              await this.obterMaiorDataDeCadastro();

              const topClientes = await resposta.json();
              if (topClientes.length > 0) {
                this.setState(state => ({
                  clientes: topClientes
                }));

                topClientes.forEach(async itemCliente => {
                  const repo = await RepositorioFactory.getClienteRepositorio();
                  await repo.adiciona(itemCliente);
                });
              }
            }
          } else {
            if (clientes.length > 0) {        

              this.setState(state => ({
                clientes: clientes
              }),()=> Loading.close());
            }
        }
    }

    async componentDidMount(){        

        console.log("did mount buscar-cliente");

        let telefonePesquisado = FiltroTelefoneRepositorio.ObterFiltroTelefone();
        if (telefonePesquisado) {
          console.log("Telefone Pesquisado:", telefonePesquisado);
          this.setState(
            {
              textoParaPesquisa: telefonePesquisado
            },
            () => {
              this.props.handleValorDaPesquisa(telefonePesquisado);
              this.buscarClientes();
            }
          );

          FiltroTelefoneRepositorio.RemoverFiltroTelefone();
        } else {
            await this.obterTodosClientes();
          }
    }    
    
    async obterMaiorDataDeCadastro(){

      let resposta = await HttpServiceHelper.InvocarServico(() => {
        return ClienteService.ObterMaiorDataDeCadastro();
      });

      if (resposta.ok) {
        const maiorData = await resposta.json();
        console.log("Maior Data de Cadastro", maiorData);
        
        UsuarioRepositorio.SalvarMaiorDataCadastroCliente(maiorData);
      }
    }

}

export default BuscarCliente;