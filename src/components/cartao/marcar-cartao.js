import React, { Component } from 'react';
import CartaoFidelidade from '../marcar-cartao/cartao-fidelidade';

class MarcarCartao extends Component{

    constructor(props){
        super(props);                
    }

    render(){
        return <div className="w3-container" id="marcarCartao" style={{marginTop:'75px'}}>
            <CartaoFidelidade qtdMarcacoes = {8} diasMarcados={["01/02/2019","02/03/2019","05/02/2019"]}></CartaoFidelidade>
        </div>
    }
}

export default MarcarCartao;

