
import React, { Component } from 'react';
import StatusColunaCartao from './status-coluna-cartao';

class ColunaCartao extends Component{

    constructor(props){
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this);

        this.state = {
            cssColuna: "",
            cssIcon: "",
            status: StatusColunaCartao.PENDENTE,
            diaDaMarcacao: ""                         
        };        
        
    }
    
    dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString().padStart(2, '0'),
            mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano  = data.getFullYear();
        return dia+"/"+mes+"/"+ano;
    }

    colunaFoiMarcada(){
        this.setState({
            status: StatusColunaCartao.MARCADO,
            cssColuna: "w3-col " + this.props.cssDivColuna + " w3-yellow w3-center w3-border w3-border-red",
            cssIcon:"w3-xxlarge fa fa-check",
            diaDaMarcacao: this.dataAtualFormatada()
        });
    }

    colunaFoiDesmarcada(){
        this.setState({
            status: StatusColunaCartao.PENDENTE,
            cssColuna: "w3-col " + this.props.cssDivColuna + " w3-center w3-border w3-border-red",
            cssIcon: "w3-xxlarge fa fa-question",
            diaDaMarcacao: ""
        });  
    }


    handleIconClick(event){
        
        if (this.state.status === StatusColunaCartao.PENDENTE){
            this.colunaFoiMarcada();
        }else{
            if (this.state.status == StatusColunaCartao.MARCADO){
               this.colunaFoiDesmarcada();
            }
        }
    }

    render(){
        return <div className={this.state.cssColuna} style={{height: '100%', cursor:'pointer'}} onClick={this.handleIconClick}>
                    <div>
                        <icon className={this.state.cssIcon}></icon>
                        <span className="w3-small">{this.state.diaDaMarcacao}</span>
                    </div>
                </div>
    }

    componentDidMount(){

        if (this.props.diaMarcado === ""){
            this.setState({
                cssColuna: "w3-col " + this.props.cssDivColuna + " w3-center w3-border w3-border-red",
                cssIcon: "w3-xxlarge fa fa-question"
            })
        }else{
            this.setState({
                cssColuna: "w3-col " + this.props.cssDivColuna + " w3-yellow w3-center w3-border w3-border-red",
                cssIcon:"w3-xxlarge fa fa-check",
                status: StatusColunaCartao.BLOQUEADO,
                diaDaMarcacao: this.props.diaMarcado
            })
        }
        
    }
}

export default ColunaCartao;

