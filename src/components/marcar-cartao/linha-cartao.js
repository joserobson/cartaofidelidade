
import React, { Component } from 'react';
import ColunaCartao from './coluna-cartao';

class LinhaCartao extends Component{

    constructor(props){
        super(props);        
    }


    render(){
        return <div className="w3-row" style={{height: this.props.alturaDaLinha}}>
                    {
                        this.props.colunas.map((coluna,index) =>
                            (
                                <ColunaCartao 
                                    key={index} 
                                    diaMarcado={coluna} 
                                    cssDivColuna={this.props.cssDivColuna}
                                    clickCartao={this.props.clickCartao}
                                    handleModal={this.props.handleModal}>
                                </ColunaCartao>    
                            ))
                    }
               </div>
    }
}

export default LinhaCartao;

