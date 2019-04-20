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

    handleChangeCartao(diasMarcados){

        console.info("handle change cartao",diasMarcados);
        this.setState({
            diasMarcados: diasMarcados
        });
    }

    handleClickSalvarCartao(event){

        Loading.show();

        //debugger;

        let cartaoDoCliente = this.state.cartaoDoCliente;
        let novasMarcacoes = this.state.diasMarcados;        

        let retorno = CartaoService.salvarCartaoFidelidade(cartaoDoCliente,novasMarcacoes);

        retorno.then((r)=>{
            Loading.close();                        
            
            let mensagemModal = {
                texto: 'Cartão Salvo Com Sucesso!!!',
                tipo: TipoDeAlerta.SUCESS
            }
    
            this.props.handleModal(mensagemModal);

            //navegar para tela home
            this.props.history.push("/");

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
                        qtdMarcacoes = {this.state.qtdMarcacoes} 
                        diasMarcados={this.state.diasMarcados}
                        onChange={this.handleChangeCartao}>
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

                //debugger;
                let qtdMarcacoes = parseInt(resp.cartaoFidelidade.Modelo.QtdMarcacoes,10);
                //let configuracao = this.definirDesenhoDoCartao(qtdMarcacoes);
                
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

