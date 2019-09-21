import React, { Component } from 'react';
import CartaoFidelidade from './cartao-fidelidade/cartao-fidelidade';
import Loading from '../loading/loading';
import { CartaoService } from '../../services/cartao-service';
import { StatusDoCartao } from '../../enums/status-cartao';
import { UsuarioService } from '../../services/usuario-service';
import { NotificationHelper } from '../../helpers/notificacao-helper';
import { HttpServiceHelper } from '../../helpers/http-service-helper';

class MarcarCartao extends Component{

    constructor(props){
        super(props);            

        this.handleClickSalvarCartao = this.handleClickSalvarCartao.bind(this);
        this.handleChangeCartao = this.handleChangeCartao.bind(this);
        this.handleClickFinalizarCartao = this.handleClickFinalizarCartao.bind(this);
        this.handleClickVoltar = this.handleClickVoltar.bind(this);
    }   

    handleChangeCartao(diasMarcados, diasDesbloqueados){

        console.info("handle change cartao=> dias marcados",diasMarcados);
        console.info("handle change cartao=> dias desbloqueados",diasDesbloqueados);
        
        this.setState({
            diasMarcados: diasMarcados,
            diasDesbloqueados: diasDesbloqueados
        });
    }

    handleClickVoltar(){
        this.props.history.push("/");      
    }

    async handleClickFinalizarCartao(){
        
        console.info(this.state.cartaoDoCliente.Id);        

        const respostaFecharCartao = await HttpServiceHelper.InvocarServico(()=>{
            return CartaoService.fecharCartao(this.state.cartaoDoCliente.Id);
        })

        if (respostaFecharCartao.ok){
            NotificationHelper.ExibirSucesso("Cartão Finalizado Com Sucesso.")
            this.props.history.push("/");
        }        

    }

    async handleClickSalvarCartao(event){        

        const usuarioLogado = UsuarioService.ObterUsuarioLogado();

        let dadosDoCartao = {
            Id: this.state.cartaoDoCliente.Id,
            TelefoneConsumidor: this.state.telefoneCliente,
            IdEmissor:  usuarioLogado.Id,
            NovosDiasMarcados: this.state.diasMarcados,
            DiasDesbloqueados: this.state.diasDesbloqueados
        }        

        const respostaSalvarCartao = await HttpServiceHelper.InvocarServico(()=> {
            return CartaoService.salvarCartaoFidelidade(dadosDoCartao);
        });

        if (respostaSalvarCartao.ok){                    

            NotificationHelper.ExibirSucesso('Cartão Atualizado Com Sucesso');

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
                                <h1 className="w3-medium w3-text-gray"> <b>{this.state.cartaoDoCliente.Numero}º Cartão</b></h1>
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
                                    
                                    <div style={{paddingTop:'10px'}}>                                                                                            
                                        <button type="button" className="w3-button w3-block w3-red" onClick={this.handleClickSalvarCartao}>Salvar</button>                                                                                
                                        <div style={{paddingTop:'10px'}}>
                                            <button type="button" className="w3-button w3-block w3-blue-gray" onClick={this.handleClickVoltar}>Voltar</button>                                                                                
                                        </div>
                                        
                                    </div>
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
           
        //Loading.show();
       
        let telefone = this.props.match.params.telefone;        

        const respostaCartao = await HttpServiceHelper.InvocarServico(()=>{
            return CartaoService.obterCartaoDoCliente(telefone);
        });        

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
                console.log("State Mount",this.state);
            });
        }        
    }   
}

export default MarcarCartao;

