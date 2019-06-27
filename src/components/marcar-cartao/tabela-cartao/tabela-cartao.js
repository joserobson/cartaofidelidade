
import React, { Component } from 'react';
import LinhaCartao from './linha-cartao/linha-cartao';

class TabelaCartao extends Component{

    constructor(props){
        super(props);        
    }


    render(){
        return <div style={{height: this.props.altura, width:'100%'}}>
                    {
                        this.props.linhas.map((linha,index) =>
                            (
                                <LinhaCartao 
                                    key={index} 
                                    colunas={linha.colunas} 
                                    cssDivColuna={this.props.cssDivColuna} 
                                    alturaDaLinha={this.props.alturaDaLinha}
                                    clickCartao={this.props.clickCartao}
                                    handleModal={this.props.handleModal}>
                                </LinhaCartao>    
                            ))
                    }
               </div>
    }

    componentWillMount(){
        //alert('desmontou');
    }

    componentDidUpdate(){
        //debugger;
        //alert('update');
    }
}

export default TabelaCartao;

