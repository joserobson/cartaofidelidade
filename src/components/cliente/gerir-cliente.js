import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import BuscarCliente from './buscar-cliente';
import Loading from '../loading/loading';
import TipoAlerta from "../modal/tipo-alerta";

class GerirCliente extends Component{
   
    constructor(props){
        super(props);
                
        this.state = {};               
    }   

    componentWillUnmount(){
        console.info("ummont gerir cliente");
    }

    render(){        

        return <div className="w3-container" id="gerirCliente" style={{marginTop:'75px'}}>                
                   
                    <BuscarCliente></BuscarCliente>                 
                    
                    <div style={{paddingTop: '10px'}}>                        
                        <Link className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom" to="cadastrarCliente">Adicionar</Link>
                    </div>
            </div>               
    }
    
}

export default GerirCliente;

