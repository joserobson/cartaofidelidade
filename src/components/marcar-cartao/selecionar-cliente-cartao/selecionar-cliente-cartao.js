import React, { Component } from 'react';
import LayoutCartao from '../../../helpers/layout-cartao-helper';
import BuscarCliente from '../../cliente/buscar-cliente';

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
        
    }


    handleChangeValorParaPesquisa(value) {     
        this.setState({
            telefoneOUCpf: value            
         });  
    }

    setarClienteSelecionado(clienteModel){

        this.setState({
            clienteSelecionado: clienteModel
        },()=>{

            
            if (this.state.telefoneOUCpf)
                localStorage.setItem('telefoneParaPesquisa',this.state.telefoneOUCpf);

            this.props.history.push("/marcarCartao/"+ this.state.clienteSelecionado.Telefone);
        })
    }    

    render(){
        return <div className="" id="marcarCartao" style={{marginTop:'15px'}}>
             
            <BuscarCliente 
                setCliente={this.setarClienteSelecionado} 
                handleModal={this.props.handleModal}
                handleValorDaPesquisa={this.handleChangeValorParaPesquisa}
                editarCliente={this.props.editarCliente}>
            </BuscarCliente>           
                               
        </div>
    }

    componentDidMount(){
            
    }
}

export default SelecionarClienteCartao;

