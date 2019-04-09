import React, { Component } from 'react';
import ConfiguracaoCartao from './configuracao-cartao';
import { Link } from 'react-router-dom'
import BuscarCliente from '../cliente/buscar-cliente';
import { ClienteModel } from '../../models/cliente-model';

class SelecionarClienteCartao extends Component{

    constructor(props){
        super(props);     
        
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            valorMarcacao: '6',
            configuracaoCartao: ConfiguracaoCartao.TAMANHO_6,
            clienteSelecionado: new ClienteModel('','',''),
        }

        this.setarClienteSelecionado = this.setarClienteSelecionado.bind(this);
    }

    handleChange(event) {     
        this.setState({
             valorMarcacao: event.target.value             
         });  
    }

    setarClienteSelecionado(clienteModel){
        
        //alert(clienteModel.Telefone);

        this.setState({
            clienteSelecionado: clienteModel
        })
    }


    render(){
        return <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>

            <BuscarCliente setCliente={this.setarClienteSelecionado} handleModal={this.props.handleModal}></BuscarCliente>
            {/* <select value={this.state.valorMarcacao} onChange={this.handleChange}>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
            </select> */}
            <p></p>
            <Link className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" to={"marcarCartao/"+ this.state.clienteSelecionado.Telefone}>Continuar</Link>
        </div>
    }
}

export default SelecionarClienteCartao;

