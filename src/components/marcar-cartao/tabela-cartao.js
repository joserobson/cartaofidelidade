
import React, { Component } from 'react';
import LinhaCartao from './linha-cartao';

class TabelaCartao extends Component{

    constructor(props){
        super(props);        
    }


    render(){
        return <div className="w3-panel" style={{height: this.props.altura, width:'98%'}}>
                    {
                        this.props.linhas.map(linha =>
                            (
                                <LinhaCartao colunas={linha.colunas} cssDivColuna={this.props.cssDivColuna} alturaDaLinha={this.props.alturaDaLinha}></LinhaCartao>    
                            ))
                    }
               </div>
    }
}

export default TabelaCartao;

