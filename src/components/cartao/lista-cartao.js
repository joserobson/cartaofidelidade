
import React, { Component } from 'react';

import ItemCartao from './item-cartao';

class ListaDeCartoes extends Component{

    constructor(props){
        super(props);        
    }

    addEventoDestacarCartaoSelecionado(){
        
        var ulCartoes = document.querySelectorAll("ul[id*=ulCartoes] li");
        ulCartoes.forEach((element)=>{
            
            element.classList.remove("w3-red");
            
            element.addEventListener("click", function(){
               
                ulCartoes.forEach((element)=>{
                    if (element.classList.contains("w3-red")){
                        element.classList.remove("w3-red");
                    }
                });
                
                element.classList.add("w3-red");                
          });
        }); 


        if (ulCartoes.length > 0){
            ulCartoes[0].classList.add("w3-red");
        }
    }

    componentDidUpdate(){
        this.addEventoDestacarCartaoSelecionado();
    }     

    componentWillUnmount(){
        console.info("ummont lista cartoes");
    }

  render(){

    return <ul className="w3-ul w3-card-4" id="ulCartoes">
              {
                  this.props.cartoes.map(cartao =>
                    (
                       <ItemCartao cartao={cartao} key={cartao.Id}></ItemCartao>
                    ))
               }              
            </ul>
  }

}

export default ListaDeCartoes;