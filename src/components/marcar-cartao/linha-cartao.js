
import React, { Component } from 'react';
import ColunaCartao from './coluna-cartao';

class LinhaCartao extends Component{

    constructor(props){
        super(props);        
    }


    render(){
        return <div className="w3-row" style={{height: this.props.alturaDaLinha}}>
                    {
                        this.props.colunas.map(coluna =>
                            (
                                <ColunaCartao diaMarcado={coluna} cssDivColuna={this.props.cssDivColuna}></ColunaCartao>    
                            ))
                    }
               </div>
    }
}

export default LinhaCartao;

