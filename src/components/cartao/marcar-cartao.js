import React, { Component } from 'react';
import CartaoFidelidade from '../marcar-cartao/cartao-fidelidade';
import ConfiguracaoCartao from '../marcar-cartao/configuracao-cartao';

class MarcarCartao extends Component{

    constructor(props){
        super(props);     
         
        let configuracao;
        switch (props.match.params.valorMarcacao) {
            case '2':
                configuracao = ConfiguracaoCartao.TAMANHO_2;
                break;
            case '4':
                configuracao = ConfiguracaoCartao.TAMANHO_4;
                break;
            case '6':
                configuracao = ConfiguracaoCartao.TAMANHO_6;
                break;
            case '8':
                configuracao = ConfiguracaoCartao.TAMANHO_8;
                break;
            case '10':
                configuracao = ConfiguracaoCartao.TAMANHO_10;
                break;
            case '12':
                configuracao = ConfiguracaoCartao.TAMANHO_12;
                break;
            case '14':
                configuracao = ConfiguracaoCartao.TAMANHO_14;
                break;
            default:
                configuracao = ConfiguracaoCartao.TAMANHO_8;
                break;
        }  
        
        this.state = {
            valorMarcacao: '6',
            configuracaoCartao: configuracao
        }        
    }   

    render(){
        return <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>        

            <CartaoFidelidade configuracao = {this.state.configuracaoCartao} diasMarcados={["01/02/2019","02/03/2019","05/02/2019"]}></CartaoFidelidade>

        </div>
    }

    componentDidMount(){        

    }
}

export default MarcarCartao;

