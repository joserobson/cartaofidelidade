
import React, { Component } from 'react';
import StatusColunaCartao from '../../../../enums/status-coluna-cartao';
import './coluna-cartao.css';
import {ConfiguracaoHelper} from "../../../../helpers/configuracao-helper";
import TipoDeAlerta from "../../../modal/tipo-alerta";
import { NotificationHelper } from '../../../../helpers/notificacao-helper';

class ColunaCartao extends Component{

    constructor(props){
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this);        

        this.state = {
            cssColuna: "",
            cssIcon: "",
            cssImg:"",
            status: StatusColunaCartao.PENDENTE,
            diaDaMarcacao: ""                         
        };                   
    }
    
    dataAtualFormatada(){
                
        var d = new Date,
        dformat = [d.getDate().padLeft(),
                    (d.getMonth()+1).padLeft(),
                    d.getFullYear()].join('/') +' ' +
                    [d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');

        return dformat;
    }

    colunaFoiMarcada(){
        this.setState({
            status: StatusColunaCartao.MARCADO,
            cssColuna: "w3-col " + this.props.cssDivColuna + " cor-coluna-marcada w3-center w3-border w3-border-black",
            cssIcon:"w3-xxlarge fa fa-times",
            cssImg:"img-marcada",
            diaDaMarcacao: this.dataAtualFormatada()
        },()=>{
            this.props.clickCartao(
                {
                    status: StatusColunaCartao.MARCADO,
                    diaDaMarcacao: this.state.diaDaMarcacao
                });
        });        
    }

    colunaFoiDesmarcada(){
        this.setState({
            status: StatusColunaCartao.PENDENTE,
            cssColuna: "w3-col " + this.props.cssDivColuna + " w3-center w3-border w3-border-black",
            cssIcon: "w3-xxlarge fa fa-pencil",
            cssImg:"img-nao-marcada",
            diaDaMarcacao: ""
        },()=>{
        });  
    }
   
    handleIconClick(event){
        
        
        if (this.state.status === StatusColunaCartao.PENDENTE){
            
            this.colunaFoiMarcada();            

        }else{
            if (this.state.status === StatusColunaCartao.MARCADO){
               
                this.colunaFoiDesmarcada();
                
                this.props.clickCartao(
                    {
                        status: StatusColunaCartao.PENDENTE,
                        diaDaMarcacao: this.state.diaDaMarcacao
                    });                

            }else{
                if (this.state.status === StatusColunaCartao.BLOQUEADO){
                   this.desbloquearColuna();
                }
            }
        }        
    }

    desbloquearColuna(){
        const colunaCartao = this;
        let mensagemModal = {
            texto: this.state.diaDaMarcacao,
            tipo: TipoDeAlerta.EVENTO_EXIBIR_MARCACAO,
            eventos: [
                { 
                    Nome: 'Excluir',
                    onClick: function(){
                                                                                               
                        colunaCartao.colunaFoiDesmarcada();

                        colunaCartao.props.clickCartao(
                            {
                                status: StatusColunaCartao.DESBLOQUEADO,
                                diaDaMarcacao: colunaCartao.state.diaDaMarcacao
                            });
                        
                        NotificationHelper.ExibirAlerta('Marcação removida, salve o cartão para completar a exclusão!!');
                                                            
                    }                                
                },
                { 
                    Nome: 'Fechar',
                    onClick: function(){}     
                }
            ]
        }

        this.props.handleModal(mensagemModal);
    }


    render(){        
        return <div className={this.state.cssColuna} style={{height: '100%', cursor:'pointer'}} onClick={this.handleIconClick}>
                    <div className="div-coluna-cartao">                        
                        <img className={this.state.cssImg} src={require("../../img/" + ConfiguracaoHelper.ObterIcone())}></img>                          
                    </div>                          
                </div>
    }

    componentDidMount(){
        
        if (this.props.diaMarcado === ""){
            this.setState({
                cssColuna: "w3-col " + this.props.cssDivColuna + " w3-center w3-border w3-border-black",
                cssIcon: "w3-xxlarge fa fa-pencil",
                cssImg:"img-nao-marcada"
            })
        }else{
            this.setState({
                cssColuna: "w3-col " + this.props.cssDivColuna + " cor-coluna-marcada w3-center w3-border w3-border-black",
                cssIcon:"w3-xxlarge fa fa-times",
                cssImg:"img-marcada",
                status: StatusColunaCartao.BLOQUEADO,
                diaDaMarcacao: this.props.diaMarcado
            })
        }
        
    }
}

export default ColunaCartao;
