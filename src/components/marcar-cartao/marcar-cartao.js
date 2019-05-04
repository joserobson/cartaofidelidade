import React, { Component } from 'react';
import CartaoFidelidade from './cartao-fidelidade';
import LayoutCartao from './layout-cartao';
import Loading from '../loading/loading';
import { CartaoService } from '../../services/cartao-service';
import TipoDeAlerta from "../modal/tipo-alerta";
import {CartaoFidelidadeModel } from "../../models/cartao-fidelidade-model";
import { StatusDoCartao } from '../../enums/status-cartao';

class MarcarCartao extends Component{

    constructor(props){
        super(props);            

        this.handleClickSalvarCartao = this.handleClickSalvarCartao.bind(this);
        this.handleChangeCartao = this.handleChangeCartao.bind(this);
        this.handleClickFinalizarCartao = this.handleClickFinalizarCartao.bind(this);
    }   

    handleChangeCartao(diasMarcados, diasDesbloqueados){

        console.info("handle change cartao=> dias marcados",diasMarcados);
        console.info("handle change cartao=> dias desbloqueados",diasDesbloqueados);
        
        this.setState({
            diasMarcados: diasMarcados,
            diasDesbloqueados: diasDesbloqueados
        });
    }

    handleClickFinalizarCartao(){

        Loading.show();

        const resp = CartaoService.FecharCartao(this.state.cartaoDoCliente);

        resp.then(()=>{
            
            Loading.close();   

            window.location.reload();
        });

    }

    handleClickSalvarCartao(event){

        Loading.show();

        let cartaoDoCliente = this.state.cartaoDoCliente;
        const diasMarcados = this.state.diasMarcados;        
        const diasDesbloqueados = this.state.diasDesbloqueados;

        //nesse retorno eu tenho a resposta se o cartão foi completado ou não
        let retorno = CartaoService.salvarCartaoFidelidade(cartaoDoCliente, diasMarcados, diasDesbloqueados);

        retorno.then((cartaoCompleto)=>{
            Loading.close();                        
            
            const marcarCartao = this;
            let mensagemModal = {
                texto: 'Cartão Salvo Com Sucesso!!!',
                tipo: TipoDeAlerta.SUCESS,
                eventos: [
                    { 
                        Nome: 'Fechar',
                        onClick: function(){
                            
                            if (cartaoCompleto){
                                
                                let cartao = marcarCartao.state.cartaoDoCliente;
                                cartao.Status = StatusDoCartao.COMPLETO;

                                marcarCartao.setState({
                                    cartaoDoCliente: cartao
                                });


                            }else{
                                //navegar para tela home
                                marcarCartao.props.history.push("/");                                                                                 
                            }                            
                        }                                
                    }
                ]
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

        
        //event.preventDefault();
    }    


    render(){
        return (
            <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>        

                { this.state && this.state.cartaoDoCliente &&
                    <div>
                        <div className="w3-bar">
                            <div className="w3-left">                                                                                              
                                <h1 className="w3-xlarge w3-text-red"><b>{this.state.nomeCartao}</b></h1>
                                <h1 className="w3-medium w3-text-black"><b>Cliente:</b> {this.state.telefoneCliente}</h1>                                                                                                
                            </div>
                            <div className="w3-right"> 
                                <h1 className="w3-xlarge w3-text-red"><b>Número:</b> <span className="w3-text-blue-gray"> {this.state.cartaoDoCliente.Numero}</span></h1>                                                                        
                            </div>
                        </div>

                            {this.state.cartaoDoCliente.Status === StatusDoCartao.ABERTO &&
                                <div className="w3-center">                
                                     <CartaoFidelidade 
                                        qtdMarcacoes = {this.state.qtdMarcacoes} 
                                        diasMarcados={this.state.diasMarcados}
                                        onChange={this.handleChangeCartao}
                                        handleModal={this.props.handleModal}>
                                    </CartaoFidelidade>

                                    <p></p>                                                                                            
                                    <button type="button" className="w3-button w3-block w3-blue" onClick={this.handleClickSalvarCartao}>Salvar</button>                                                                                
                                </div>
                            }
                        
                            <br></br>
                            { this.state.cartaoDoCliente.Status === StatusDoCartao.COMPLETO &&                        
                                <div className="w3-border w3-border-red">
                                    <h1 className="w3-xlarge w3-text-blue-gray w3-center"><b>Cartão Completo!</b></h1>
                                    <h1 className="w3-xlarge w3-text-red w3-center"><b>Cliente já Recebeu o Benefício?</b></h1>

                                    <h1 className="w3-xlarge w3-text-blue-gray w3-center"><b>Se sim, Clique em Finalizar.</b></h1>
                                    <div className="w3-center w3-padding-small">
                                            <button type="button" className="w3-button w3-red" onClick={this.handleClickFinalizarCartao}>Finalizar Cartão</button>
                                    </div>                                    
                                </div>                        
                            }
                </div>
                }   
        </div>
        )
    }

    componentDidMount(){        

        //buscar as marcacoes do cliente        
        Loading.show();
       
        let telefone = this.props.match.params.telefone;        

        CartaoService.obterCartaoDoCliente(telefone)
            .then((resp)=>{
                
                console.log("Cartao Cliente", resp);
                
                let qtdMarcacoes = parseInt(resp.cartaoFidelidade.Modelo.QtdMarcacoes,10);                
                
                this.setState({
                    respostaCartao: resp,
                    cartaoDoCliente: resp.cartaoFidelidade,
                    diasMarcados: resp.cartaoFidelidade.Ocorrencias,
                    nomeCartao: resp.cartaoFidelidade.Modelo.Nome,
                    telefoneCliente: telefone,
                    qtdMarcacoes: qtdMarcacoes
                });

            }).finally(()=>{
                Loading.close();
            });
    }   
}

export default MarcarCartao;

