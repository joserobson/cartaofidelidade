import React,{Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CadastrarCliente from '../../cliente/cadastrar-cliente';
import SelecionarClienteCartao from '../selecionar-cliente-cartao';
import '../tab-marcar-cartao/tab-marcar-cartao.css';

class TabMarcarCartao extends Component{

    constructor(props)
    {
        super(props);
    }

    render(){

        return <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>
                    <Tabs>
                        <TabList>
                            <Tab>Clientes</Tab>
                            <Tab>Novo Cliente</Tab>
                        </TabList>

                        <TabPanel>
                            <SelecionarClienteCartao handleModal={this.props.handleModal} history={this.props.history} />
                        </TabPanel>
                        <TabPanel>
                            <CadastrarCliente handleModal={this.props.handleModal} history={this.props.history}/>                             
                        </TabPanel>
                    </Tabs>
                </div>
    }

}

export default TabMarcarCartao;
