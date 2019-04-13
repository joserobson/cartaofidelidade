import React, { Component } from 'react';
import TabelaCartao from './tabela-cartao';
import ConfiguracaoCartao from './configuracao-cartao';
import StatusColunaCartao from './status-coluna-cartao';

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

        debugger;
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


    carregaCartao(configuracaoCartao){

        
        let diasMarcados = this.state.diasMarcados;        
        
        //calculo altura e largura        
        let altura = window.innerHeight;
        let largura = window.innerWidth;

        let alturaCartao = Math.round(altura * 0.55);
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

