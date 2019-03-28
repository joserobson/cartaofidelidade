
import React, { Component } from 'react';

import ItemCliente from './item-cliente';

class ListaDeClientes extends Component{

    constructor(props){
        super(props);

        console.log(props.clientes);
    }

    addEventoDestacarClienteSelecionado(){
        
        var ulClientes = document.querySelectorAll("ul[id*=ulClientes] li");
        ulClientes.forEach((element)=>{
            
            element.classList.remove("w3-red");
            
            element.addEventListener("click", function(){
               
                ulClientes.forEach((element)=>{
                    if (element.classList.contains("w3-red")){
                        element.classList.remove("w3-red");
                    }
                });
                
                element.classList.add("w3-red");                
          });
        }); 


        if (ulClientes.length > 0){
            ulClientes[0].classList.add("w3-red");
        }
    }

    componentDidUpdate(){
        this.addEventoDestacarClienteSelecionado();
    }     

    componentWillUnmount(){
        console.info("ummont lista cliente");
    }

  render(){

    return <ul className="w3-ul w3-card-4" id="ulClientes">
              {
                  this.props.clientes.map(cliente =>
                    (
                       <ItemCliente cliente={cliente} key={cliente.Cpf}></ItemCliente>
                    ))
               }              
            </ul>
  }

}

export default ListaDeClientes;