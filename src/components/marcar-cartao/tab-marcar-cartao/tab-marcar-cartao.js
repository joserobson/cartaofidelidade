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
            labelAbaCliente: 'Adicionar'
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
        console.log(texto);

        this.setState({
            tabIndex,
            clienteParaEdicao: null,
            labelAbaCliente: 'Adicionar'
        });
    }


    render(){

        return <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>                    

                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.selecionarAbaCliente(tabIndex)}>
                        <TabList>
                            <Tab>Clientes</Tab>
                            <Tab>{this.state.labelAbaCliente}</Tab>
                        </TabList>

                        <TabPanel>
                            <SelecionarClienteCartao 
                                handleModal={this.props.handleModal}   
                                history={this.props.history} 
                                editarCliente={this.editarCliente}
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
