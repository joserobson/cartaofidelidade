
import React, { Component } from 'react';
import StatusColunaCartao from './status-coluna-cartao';
import './coluna-cartao.css';
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
        
        Number.prototype.padLeft = function(base,chr){
            var  len = (String(base || 10).length - String(this).length)+1;
            return len > 0? new Array(len).join(chr || '0')+this : this;
        }
    }
    
    dataAtualFormatada(){
        
        var d = new Date,
        dformat = [(d.getMonth()+1).padLeft(),
               d.getDate().padLeft(),
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
            if (this.state.status == StatusColunaCartao.MARCADO){
               
                this.colunaFoiDesmarcada();

                this.props.clickCartao(
                    {
                        status: StatusColunaCartao.PENDENTE,
                        diaDaMarcacao: this.state.diaDaMarcacao
                    });

            }
        }

        
    }

    render(){
        return <div className={this.state.cssColuna} style={{height: '100%', cursor:'pointer'}} onClick={this.handleIconClick}>
                    <div className="div-coluna-cartao">
                        {/* <i className={this.state.cssIcon}></i>    */}
                        <img className={this.state.cssImg} src={require("./icone-cafe-50.png")}></img>                          
                    </div>      
                    {/* <div>
                        <span className="font-coluna-cartao">{this.state.diaDaMarcacao}</span>   
                    </div>                            */}
                </div>
    }

    componentDidMount(){

        //debugger;
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

