import React, { Component } from 'react';
import TabelaCartao from './tabela-cartao';
import ConfiguracaoCartao from './configuracao-cartao';

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
    }


    carregaCartao(configuracaoCartao){

        debugger;
        let diasMarcados = this.state.diasMarcados;        
        
        //calculo altura e largura        
        let altura = window.innerHeight;
        let largura = window.innerWidth;

        let alturaCartao = Math.round(altura * 0.70);
        //let larguraCartao = Math.round(largura * 0.65);
        if (largura < 980)
        {            
            //alturaCartao = Math.round(altura * 0.50);
        }

        let alturaEmPx = alturaCartao.toString() +"px";        
        let alturaDaLinha = alturaCartao / configuracaoCartao.NUMERO_LINHAS;
        let alturaDalinhaEmPx = alturaDaLinha.toString() + "px";            

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


        this.setState({
            linhas: linhas,            
            alturaTabela: alturaEmPx,
            cssDivColuna: configuracaoCartao.CSS_DIV_COL,
            alturaDaLinha: alturaDalinhaEmPx               
        });
    }    

    render(){
        return <div>                
                    <TabelaCartao linhas={this.state.linhas} altura={this.state.alturaTabela} alturaDaLinha={this.state.alturaDaLinha} cssDivColuna={this.state.cssDivColuna}></TabelaCartao>
               </div>
    }

    componentWillUnmount(){
        //alert('desmontaou');
    }

    componentDidMount(){
        //alert('mount');
        this.carregaCartao(this.props.configuracao);
    }

    componentDidUpdate(prevProps){
        //alert('update');

        if (this.props.configuracao !== prevProps.configuracao){
            this.carregaCartao(this.props.configuracao);        
        }
    }

    componentWillUpdate(){
        //this.carregaCartao(this.props.configuracao);
    }
    
}

export default CartaoFidelidade;

