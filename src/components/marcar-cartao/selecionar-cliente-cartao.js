import React, { Component } from 'react';
import LayoutCartao from './layout-cartao';
import { Link } from 'react-router-dom'
import BuscarCliente from '../cliente/buscar-cliente';
import { ClienteModel } from '../../models/cliente-model';

class SelecionarClienteCartao extends Component{

    constructor(props){
        super(props);     
                
        this.state = {
            telefoneOUCpf: '',
            configuracaoCartao: LayoutCartao.TAMANHO_6,
            clienteSelecionado: null,            
        }

        this.handleChangeValorParaPesquisa = this.handleChangeValorParaPesquisa.bind(this);

        this.setarClienteSelecionado = this.setarClienteSelecionado.bind(this);
        
        this.handleClickLimparCache = this.handleClickLimparCache.bind(this);
    }


    handleClickLimparCache(){

        localStorage.removeItem("cartaoFidelidade");
        localStorage.removeItem("user");
        
        let mensagemModal = {
            texto: 'Cacche de cartões deletado com sucesso!!!"',
            tipo: 'sucess'
        }

        this.props.handleModal(mensagemModal);
    
    }

    handleChangeValorParaPesquisa(value) {     
        this.setState({
            telefoneOUCpf: value            
         });  
    }

    setarClienteSelecionado(clienteModel){

        this.setState({
            clienteSelecionado: clienteModel
        })
    }


    render(){
        return <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>

            <BuscarCliente 
                setCliente={this.setarClienteSelecionado} 
                handleModal={this.props.handleModal}
                handleValorDaPesquisa={this.handleChangeValorParaPesquisa}>
            </BuscarCliente>           
            
            {this.state.clienteSelecionado &&
                <div>
                    <br></br>
                    <Link className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" to={"marcarCartao/"+ this.state.clienteSelecionado.Telefone}>Exibir Cartão</Link>                                
                </div>
            }

            <br></br>
            <Link className="w3-button w3-block w3-padding-large w3-blue-gray w3-margin-bottom" to={"cadastrarCliente/"+this.state.telefoneOUCpf}>Cadastrar Cliente</Link>
            <button className="w3-button w3-block w3-padding-large w3-gray w3-margin-bottom" onClick={this.handleClickLimparCache}>Limpar cache</button>
        </div>
    }
}

export default SelecionarClienteCartao;

