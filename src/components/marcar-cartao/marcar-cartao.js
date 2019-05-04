import React, { Component } from 'react';
import CartaoFidelidade from './cartao-fidelidade';
import LayoutCartao from './layout-cartao';
import Loading from '../loading/loading';
import { CartaoService } from '../../services/cartao-service';
import TipoDeAlerta from "../modal/tipo-alerta";
import {CartaoFidelidadeModel } from "../../models/cartao-fidelidade-model";

class MarcarCartao extends Component{

    constructor(props){
        super(props);            

        this.handleClickSalvarCartao = this.handleClickSalvarCartao.bind(this);
        this.handleChangeCartao = this.handleChangeCartao.bind(this);
    }   

    handleChangeCartao(diasMarcados, diasDesbloqueados){

        console.info("handle change cartao=> dias marcados",diasMarcados);
        console.info("handle change cartao=> dias desbloqueados",diasDesbloqueados);
        
        this.setState({
            diasMarcados: diasMarcados,
            diasDesbloqueados: diasDesbloqueados
        });
    }

    handleClickSalvarCartao(event){

        Loading.show();

        //debugger;

        let cartaoDoCliente = this.state.cartaoDoCliente;
        const diasMarcados = this.state.diasMarcados;        
        const diasDesbloqueados = this.state.diasDesbloqueados;

        let retorno = CartaoService.salvarCartaoFidelidade(cartaoDoCliente, diasMarcados, diasDesbloqueados);

        retorno.then((r)=>{
            Loading.close();                        
            
            const marcarCartao = this;
            let mensagemModal = {
                texto: 'Cartão Salvo Com Sucesso!!!',
                tipo: TipoDeAlerta.SUCESS,
                eventos: [
                    { 
                        Nome: 'Fechar',
                        onClick: function(){
                            //navegar para tela home
                            marcarCartao.props.history.push("/");                                                                                 
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

            {   this.state && this.state.cartaoDoCliente &&
                <div>
                    <div className="">
                        <h1 className="w3-xlarge w3-text-red"><b>{this.state.nomeCartao}</b></h1>
                        <h1 className="w3-medium w3-text-black"><b>Cliente:</b> {this.state.telefoneCliente}</h1>
                        {/* <h1 className="w3-small w3-text-black"><b>Benefício:</b> 40% de Desconto</h1> */}
                    </div>

                    <CartaoFidelidade 
                        qtdMarcacoes = {this.state.qtdMarcacoes} 
                        diasMarcados={this.state.diasMarcados}
                        onChange={this.handleChangeCartao}
                        handleModal={this.props.handleModal}>
                    </CartaoFidelidade>

                    <br></br>
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

