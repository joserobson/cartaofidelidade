import React,{Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CadastrarCliente from './../../cliente/cadastrar-cliente/cadastrar-cliente'
import SelecionarClienteCartao from '../selecionar-cliente-cartao/selecionar-cliente-cartao';
import '../tab-marcar-cartao/tab-marcar-cartao.css';
import { ClienteModel } from '../../../models/cliente-model';
import { FiltroTelefoneRepositorio } from '../../../repositorios/filtro-telefone-repositorio';

class TabMarcarCartao extends Component{

    constructor(props)
    {
        super(props);
        this.state = { 
            tabIndex: 0,
            clienteParaEdicao: {},
            labelAbaCliente: 'Adicionar',
            atualizarClientes: false
         };

        this.editarCliente = this.editarCliente.bind(this);
        this.changeClick = this.changeClick.bind(this);
    }

    changeClick(){
        this.setState({
            tabIndex: 0            
         });  
    }

    editarCliente(clienteModel){
        
        this.setState({
            tabIndex: 1,
            clienteParaEdicao: clienteModel,
            labelAbaCliente: 'Editar'            
         });  

    }

    selecionarAbaCliente(tabIndex){

          let texto = FiltroTelefoneRepositorio.ObterFiltroTelefone();
          console.log("selecionar aba cliente", texto);

          this.setState({
            tabIndex,
            clienteParaEdicao: null,
            labelAbaCliente: "Adicionar"
          });
        
    }

    onRefreshClientes = ()=> {

        console.info('click onrefresj clientes');
        this.setState({
            atualizarClientes: !this.state.atualizarClientes
        });
    }

    render(){

        return <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>                    

                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.selecionarAbaCliente(tabIndex)}>
                        <TabList>
                            <Tab>
                                <div className="w3-row">
                                    <div className="w3-col" style={{width:'20%'}}>
                                        <i className="fa fa-refresh w3-xlarge" style={{cursor: 'pointer'}} 
                                            onClick={this.onRefreshClientes}></i>
                                    </div>        
                                    <div className="w3-col" style={{width:'80%'}}>
                                        Clientes
                                    </div>    
                                </div>                                
                            </Tab>
                            <Tab>
                                <div className="w3-row">
                                    <div className="w3-col">
                                        {this.state.labelAbaCliente}
                                    </div>
                                </div>
                                
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <SelecionarClienteCartao 
                                handleModal={this.props.handleModal}   
                                history={this.props.history} 
                                editarCliente={this.editarCliente}
                                atualizarClientes={this.state.atualizarClientes}
                                />
                        </TabPanel>
                        <TabPanel>
                            <CadastrarCliente 
                                handleModal={this.props.handleModal} 
                                history={this.props.history}
                                clienteParaEdicao={this.state.clienteParaEdicao}
                                voltar={this.changeClick}
                                />                             
                        </TabPanel>
                    </Tabs>
                </div>
    }

}

export default TabMarcarCartao;
