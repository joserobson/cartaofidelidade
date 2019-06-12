import React, { Component } from 'react';
import CartaoFidelidade from './cartao-fidelidade';
import Loading from '../loading/loading';
import { CartaoService } from '../../services/cartao-service';
import TipoDeAlerta from "../modal/tipo-alerta";
import { StatusDoCartao } from '../../enums/status-cartao';
import { UsuarioService } from '../../services/usuario-service';
import {NotificationManager} from 'react-notifications';

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

        console.info(this.state.cartaoDoCliente.Id);
        const respostaFecharCartao = CartaoService.FecharCartao(this.state.cartaoDoCliente.Id);

        respostaFecharCartao.then((resp)=>{
            
            Loading.close();   

            if (resp.ok)            
            {
                
                let mensagemModal = {
                    texto: "Cartão Finalizado Com Sucesso.",
                    tipo: TipoDeAlerta.SUCESS
                }
        
                this.props.handleModal(mensagemModal);

                this.props.history.push("/");

            }else{
                
                resp.json().then((erro)=>{                                    

                    let mensagemModal = {
                        texto: erro.Message,
                        tipo: TipoDeAlerta.WARNING
                    }
            
                    this.props.handleModal(mensagemModal);

                });

                
            }
        });

    }

    async handleClickSalvarCartao(event){

        Loading.show();

        const usuarioLogado = UsuarioService.ObterUsuarioLogado();

        let dadosDoCartao = {
            Id: this.state.cartaoDoCliente.Id,
            TelefoneConsumidor: this.state.telefoneCliente,
            IdEmissor:  usuarioLogado.Id,
            NovosDiasMarcados: this.state.diasMarcados,
            DiasDesbloqueados: this.state.diasDesbloqueados
        }

        const respostaSalvarCartao = await CartaoService.salvarCartaoFidelidade(dadosDoCartao);

        if (respostaSalvarCartao.ok){

            Loading.close();             

            NotificationManager.success('Cartão Marcado Com Sucesso','',3000);

            const bodyResposta = await respostaSalvarCartao.json();

            if (bodyResposta.CompletouCartao){
                
                console.log("Cartão Completo!!!");

                let cartao = this.state.cartaoDoCliente;
                cartao.Status = StatusDoCartao.COMPLETO;

                this.setState({
                    cartaoDoCliente: cartao
                });
            }else{                                

                console.log("Cartão em Aberto");

                this.props.history.push("/");      
            }

        }else{

            Loading.close(); 
            
            const erro = respostaSalvarCartao.json();

            //alert(erro.Message);

            NotificationManager.success(erro.Message,'',3000);
        }       
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

    async componentDidMount(){        

        //buscar as marcacoes do cliente        
        Loading.show();
       
        let telefone = this.props.match.params.telefone;        


        const respostaCartao = await CartaoService.obterCartaoDoCliente(telefone);

        if (respostaCartao.ok){

            const cartaoCliente = await respostaCartao.json();
            
            console.log("Cartao do Cliente", cartaoCliente);

            const usuarioLogado = UsuarioService.ObterUsuarioLogado();

            console.log("Usuario logado",usuarioLogado);

            this.setState({                
                cartaoDoCliente: cartaoCliente,
                diasMarcados: cartaoCliente.DiasMarcados,
                nomeCartao: usuarioLogado.ModeloCartaoFidelidade.Nome,
                telefoneCliente: telefone,
                qtdMarcacoes: usuarioLogado.ModeloCartaoFidelidade.QtdMarcacoes
            },()=>{
                Loading.close();

                console.log("State Mount",this.state);
            });
        }else{

            Loading.close();
            
            const erro = respostaCartao.json();

            alert(erro.Message);
        }

        // CartaoService.obterCartaoDoCliente(telefone)
        //     .then((resp)=>{
                
        //         console.log("Cartao Cliente", resp);
                
        //         let qtdMarcacoes = parseInt(resp.cartaoFidelidade.Modelo.QtdMarcacoes,10);                
                
        //         this.setState({
        //             respostaCartao: resp,
        //             cartaoDoCliente: resp.cartaoFidelidade,
        //             diasMarcados: resp.cartaoFidelidade.Ocorrencias,
        //             nomeCartao: resp.cartaoFidelidade.Modelo.Nome,
        //             telefoneCliente: telefone,
        //             qtdMarcacoes: qtdMarcacoes
        //         });

        //     }).finally(()=>{
        //         Loading.close();
        //     });
    }   
}

export default MarcarCartao;

