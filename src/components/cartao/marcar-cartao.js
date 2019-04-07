import React, { Component } from 'react';
import CartaoFidelidade from '../marcar-cartao/cartao-fidelidade';
import ConfiguracaoCartao from '../marcar-cartao/configuracao-cartao';
import Loading from '../loading/loading';
import { CartaoService } from '../../services/cartao-service';

class MarcarCartao extends Component{

    constructor(props){
        super(props);            
    }   

    render(){
        return (
            <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>        

            {   this.state && this.state.cartaoDoCliente &&
                <div>
                    <div className="w3-container">
                        <h1 className="w3-xlarge w3-text-red"><b>{this.state.nomeCartao}</b></h1>
                        <h1 className="w3-small w3-text-black"><b>Cliente:</b> {this.state.telefoneCliente}</h1>
                        {/* <h1 className="w3-small w3-text-black"><b>Benefício:</b> 40% de Desconto</h1> */}
                    </div>

                    <CartaoFidelidade 
                        configuracao = {this.state.configuracaoCartao} 
                        diasMarcados={this.state.diasMarcados}>
                    </CartaoFidelidade>

                    <button type="submit" className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom">Salvar</button>
               </div>
            }   
        </div>
        )
    }

    componentDidMount(){        

        //buscar as marcacoes do cliente
        
        Loading.show();
       
        let telefone = this.props.match.params.telefone;
        //alert(telefone);

        CartaoService.obterCartoesDoCliente(telefone)
            .then((resp)=>{
                
                console.log("Cartao Cliente", resp);

                debugger;
                
                let configuracao = this.definirDesenhoDoCartao(resp.cartaoFidelidade.configuracao.QtdMarcacoes);
                
                this.setState({
                    cartaoDoCliente: resp,
                    diasMarcados: resp.cartaoFidelidade.ocorrencias,
                    nomeCartao: resp.cartaoFidelidade.configuracao.Nome,
                    telefoneCliente: telefone,
                    configuracaoCartao: configuracao
                });

            }).finally(()=>{
                Loading.close();
            });
    }

    definirDesenhoDoCartao(qtdMarcacoes){

        let configuracao;

        switch (qtdMarcacoes) {
            case 2:
                configuracao = ConfiguracaoCartao.TAMANHO_2;
                break;
            case 4:
                configuracao = ConfiguracaoCartao.TAMANHO_4;
                break;
            case 6:
                configuracao = ConfiguracaoCartao.TAMANHO_6;
                break;
            case 8:
                configuracao = ConfiguracaoCartao.TAMANHO_8;
                break;
            case 10:
                configuracao = ConfiguracaoCartao.TAMANHO_10;
                break;
            case 12:
                configuracao = ConfiguracaoCartao.TAMANHO_12;
                break;
            case 14:
                configuracao = ConfiguracaoCartao.TAMANHO_14;
                break;
            default:
                configuracao = ConfiguracaoCartao.TAMANHO_8;
                break;
        }  

        return configuracao;
    }
}

export default MarcarCartao;

