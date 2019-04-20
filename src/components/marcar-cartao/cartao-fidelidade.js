import React, { Component } from 'react';
import TabelaCartao from './tabela-cartao';
import StatusColunaCartao from './status-coluna-cartao';
import LayoutCartao from './layout-cartao';

class CartaoFidelidade extends Component{

    constructor(props){
        super(props);                     

        this.state = {
            linhas: [],            
            alturaTabela: "",
            cssDivColuna: "",            
            valorMarcacao: '2',
            diasMarcados: this.props.diasMarcados
        }   
        
        //this.adicionarDiaMarcado = this.adicionarDiaMarcado.bind(this);
        //this.removerDiaMarcado = this.removerDiaMarcado.bind(this);
        this.onClickCartao = this.onClickCartao.bind(this);
    }

    adicionarDiaMarcado(dia){

        let diasMarcados = this.state.diasMarcados;
        diasMarcados.push(dia);
        this.setState({
            diasMarcados: diasMarcados
        },()=>{
            this.props.onChange(this.state.diasMarcados);
        });
    }

    removerDiaMarcado(dia){

        let diasMarcados = this.state.diasMarcados;

        let index = diasMarcados.indexOf(dia);

        if (index > -1){
            
            diasMarcados.splice(index,1);

            this.setState({
                diasMarcados: diasMarcados
            },()=>{
                this.props.onChange(this.state.diasMarcados);
            });
        }

    }

    onClickCartao(event){

        //debugger;
        console.info(event);
    
        let dia = event.diaDaMarcacao;

        if (event.status === StatusColunaCartao.MARCADO){

            this.adicionarDiaMarcado(dia);

        }else{
            if (event.status === StatusColunaCartao.PENDENTE){
                
                this.removerDiaMarcado(dia);
            }
        }
    }


    carregaCartao(qtdMarcacoes){

                
        let diasMarcados = this.state.diasMarcados;        
        
        //calculo altura e largura        
        let altura = window.innerHeight;
        let largura = window.innerWidth;

        let alturaCartao = Math.round(altura * 0.55);      
        let alturaEmPx = alturaCartao.toString() +"px";        
        let numeroColunasPorLinha,numeroDelinhas,cssDivCol,layoutCartao;

        if (largura < 980)
        {                    
           layoutCartao = this.definirLayoutDoCartaoMenor980(qtdMarcacoes);           
        }else{
            layoutCartao = this.definirLayoutDoCartaoMaior980(qtdMarcacoes);            
        }

        numeroDelinhas = layoutCartao.NUMERO_LINHAS;
        numeroColunasPorLinha =  layoutCartao.NUMERO_COLUNAS;
        cssDivCol = layoutCartao.CSS_DIV_COL;
        
        let alturaDaLinha = alturaCartao / numeroDelinhas;
        let alturaDalinhaEmPx = alturaDaLinha.toString() + "px";            

        
        let linhas = [];

        for (let indexLinha = 0; indexLinha < numeroDelinhas; indexLinha++) {

            let colunas = []
            
            for (let indexColuna = 0; indexColuna < numeroColunasPorLinha; indexColuna++) {       

                if (diasMarcados.length > 0)
                {
                    colunas.push(diasMarcados.shift());
                }else{
                    colunas.push("");
                }
            }               

            linhas.push(
                {
                    colunas: colunas,                    
                });
        }


        this.setState({
            linhas: linhas,            
            alturaTabela: alturaEmPx,
            cssDivColuna: cssDivCol,
            alturaDaLinha: alturaDalinhaEmPx               
        });
    }    

    render(){
        return <div>                
                    <TabelaCartao 
                        linhas={this.state.linhas} 
                        altura={this.state.alturaTabela} 
                        alturaDaLinha={this.state.alturaDaLinha} 
                        cssDivColuna={this.state.cssDivColuna}
                        clickCartao={this.onClickCartao}>
                    </TabelaCartao>
               </div>
    }

    componentWillUnmount(){        
    }

    componentDidMount(){        
        this.carregaCartao(this.props.qtdMarcacoes);
    }

    componentDidUpdate(prevProps){        

        if (this.props.configuracao !== prevProps.configuracao){
            this.carregaCartao(this.props.configuracao);        
        }
    }

    componentWillUpdate(){        
    }

    definirLayoutDoCartaoMenor980(qtdMarcacoes){

        let layout;

        switch (qtdMarcacoes) {           
            case 6:
                layout = LayoutCartao.MENOR_980.TAMANHO_6;
                break;
            case 8:
                layout = LayoutCartao.MENOR_980.TAMANHO_8;
                break;
            case 10:
                layout = LayoutCartao.MENOR_980.TAMANHO_10;
                break;
            case 12:
                layout = LayoutCartao.MENOR_980.TAMANHO_12;
                break;
            case 14:
                layout = LayoutCartao.MENOR_980.TAMANHO_14;
                break;
            default:
                layout = LayoutCartao.MENOR_980.TAMANHO_8;
                break;
        }  

        return layout;
    }

    definirLayoutDoCartaoMaior980(qtdMarcacoes){

        let layout;

        switch (qtdMarcacoes) {           
            case 6:
                layout = LayoutCartao.TAMANHO_6;
                break;
            case 8:
                layout = LayoutCartao.TAMANHO_8;
                break;
            case 10:
                layout = LayoutCartao.TAMANHO_10;
                break;
            case 12:
                layout = LayoutCartao.TAMANHO_12;
                break;
            case 14:
                layout = LayoutCartao.TAMANHO_14;
                break;
            default:
                layout = LayoutCartao.TAMANHO_8;
                break;
        }  

        return layout;
    }
    
}

export default CartaoFidelidade;

