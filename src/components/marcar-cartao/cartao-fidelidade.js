import React, { Component } from 'react';
import TabelaCartao from './tabela-cartao';
import ConfiguracaoCartao from './configuracao-cartao';

class CartaoFidelidade extends Component{

    constructor(props){
        super(props);
         
        //const qtdMarcacoes = this.props.qtdMarcacoes;
        let diasMarcados = this.props.diasMarcados;
        const configuracaoCartao = ConfiguracaoCartao.TAMANHO_12;

        //calculo altura e largura        
        let altura = window.innerHeight;
        let largura = window.innerWidth;
        
        let alturaCartao = Math.round(altura * 0.70);
        let larguraCartao = Math.round(largura * 0.65);
        if (largura < 900)
        {
            larguraCartao = Math.round(largura * 0.90);
            //alturaCartao = Math.round(altura * 0.30);
        }
        
        let alturaEmPx = alturaCartao.toString() +"px";
        let larguraEmPx = larguraCartao.toString() + "px";

        let alturaDaLinha = alturaCartao / configuracaoCartao.NUMERO_LINHAS;
        let alturaDalinhaEmPx = alturaDaLinha.toString() + "px";
        debugger;    
        
        const numeroColunasPorLinha = configuracaoCartao.NUMERO_COLUNAS;
        const numeroDelinhas = configuracaoCartao.NUMERO_LINHAS;
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

        
        this.state = {
            linhas: linhas,
            larguraTabela: larguraEmPx,
            alturaTabela: alturaEmPx,
            cssDivColuna: configuracaoCartao.CSS_DIV_COL,
            alturaDaLinha: alturaDalinhaEmPx    
        }
    }

    render(){
        return <div>
                    <TabelaCartao linhas={this.state.linhas} largura={this.state.larguraTabela} altura={this.state.alturaTabela} alturaDaLinha={this.state.alturaDaLinha} cssDivColuna={this.state.cssDivColuna}></TabelaCartao>
               </div>
    }

    componentDidMount(){
        //alert('mount');
    }

    componentDidUpdate(){
        //alert('update');
    }
}

export default CartaoFidelidade;

