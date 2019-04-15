import React, { Component } from 'react';
import LayoutCartao from './layout-cartao';
import { Link } from 'react-router-dom'
import BuscarCliente from '../cliente/buscar-cliente';
import { ClienteModel } from '../../models/cliente-model';

class SelecionarClienteCartao extends Component{

    constructor(props){
        super(props);     
        
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            valorMarcacao: '6',
            configuracaoCartao: LayoutCartao.TAMANHO_6,
            clienteSelecionado: new ClienteModel('','',''),
        }

        this.setarClienteSelecionado = this.setarClienteSelecionado.bind(this);
        
        this.handleClickLimparCache = this.handleClickLimparCache.bind(this);
    }


    handleClickLimparCache(){

        localStorage.removeItem("cartaoFidelidade");
        
        let mensagemModal = {
            texto: 'Cacche de cartões deletado com sucesso!!!"',
            tipo: 'sucess'
        }

        this.handleModal(mensagemModal);
    
    }

    handleChange(event) {     
        this.setState({
             valorMarcacao: event.target.value             
         });  
    }

    setarClienteSelecionado(clienteModel){

        this.setState({
            clienteSelecionado: clienteModel
        })
    }


    render(){
        return <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>

            <BuscarCliente setCliente={this.setarClienteSelecionado} handleModal={this.props.handleModal}></BuscarCliente>           
            
            <p></p>
            <Link className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" to={"marcarCartao/"+ this.state.clienteSelecionado.Telefone}>Continuar</Link>
           
            <br></br>
            <Link className="w3-button w3-block w3-padding-large w3-gray w3-margin-bottom" to={"cadastrarCliente/"+ this.state.clienteSelecionado.Telefone}>Cadastrar Cliente</Link>
            <button className="w3-button w3-block w3-padding-large w3-gray w3-margin-bottom" onClick={this.handleClickLimparCache}>Limpar cache</button>
        </div>
    }
}

export default SelecionarClienteCartao;

