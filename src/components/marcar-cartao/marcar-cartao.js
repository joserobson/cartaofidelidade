import React, { Component } from 'react';
import CartaoFidelidade from './cartao-fidelidade';
import ConfiguracaoCartao from './configuracao-cartao';
import Loading from '../loading/loading';
import { CartaoService } from '../../services/cartao-service';
import TipoDeAlerta from "../modal/tipo-alerta";
import {CartaoFidelidadeModel } from "../../models/cartao-fidelidade";

class MarcarCartao extends Component{

    constructor(props){
        super(props);            

        this.handleClickSalvarCartao = this.handleClickSalvarCartao.bind(this);
        this.handleChangeCartao = this.handleChangeCartao.bind(this);
    }   

    handleChangeCartao(diasMarcados){

        console.info("handle change cartao",diasMarcados);
        this.setState({
            diasMarcados: diasMarcados
        });
    }

    handleClickSalvarCartao(event){

        Loading.show();

        debugger;

        let cartaoDoCliente = this.state.cartaoDoCliente;
        let novasMarcacoes = this.state.diasMarcados;

        let cartao = new CartaoFidelidadeModel(cartaoDoCliente.cliente,cartaoDoCliente.modelo,
            novasMarcacoes); 

        let retorno = CartaoService.salvarCartaoFidelidade(cartao);

        retorno.then((r)=>{
            Loading.close();                        
            
            let mensagemModal = {
                texto: 'Cartão Salvo Com Sucesso!!!',
                tipo: TipoDeAlerta.SUCESS
            }
    
            this.props.handleModal(mensagemModal);

        },(reject)=>{
            Loading.close();            

            let mensagemModal = {
                texto: 'Erro ao Salvar Cartão',
                tipo: TipoDeAlerta.WARNING
            }
    
            this.props.handleModal(mensagemModal);
        });        

        
        event.preventDefault();
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
                        diasMarcados={this.state.diasMarcados}
                        onChange={this.handleChangeCartao}>
                    </CartaoFidelidade>

                    <button type="button" className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" onClick={this.handleClickSalvarCartao}>Salvar</button>
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

                //debugger;
                
                let configuracao = this.definirDesenhoDoCartao(resp.cartaoFidelidade.modelo.QtdMarcacoes);
                
                this.setState({
                    cartaoDoCliente: resp,
                    diasMarcados: resp.cartaoFidelidade.ocorrencias,
                    nomeCartao: resp.cartaoFidelidade.modelo.Nome,
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

