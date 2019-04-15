import React, { Component } from "react";

import ItemModeloCartao from "./item-modelo-cartao";

class ListaModeloCartao extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modeloCartaoSelecionado: null
    };
  }

  desmarcarModeloCartao() {
    var ulModelos = document.querySelectorAll("ul[id*=ulModeloCartoes] li");
    ulModelos.forEach(element => {
      element.classList.remove("w3-red");
    });
  }

  addEventoDestacarModeloCartaoSelecionado() {
    var lisVermelhos = document.querySelectorAll(
      "ul[id*=ulModeloCartoes] li.w3-red"
    );

    if (lisVermelhos.length === 0) {
      let ulModelos = document.querySelectorAll("ul[id*=ulModeloCartoes] li");

      if (ulModelos.length > 0) ulModelos[0].classList.add("w3-red");
    }
  }

  componentDidUpdate() {
    this.addEventoDestacarModeloCartaoSelecionado();
  }

  componentWillUnmount() {
    console.info("ummont lista cartoes");
  }  

  render() {
    return (
      <ul className="w3-ul w3-card-4" id="ulModeloCartoes">
        {this.props.modelosCartoes.map(modelo => (
          <ItemModeloCartao
            modeloCartao={modelo}
            key={modelo.Id}
            setModeloCartao={this.props.setModeloCartao}
            desmarcarModeloCartao={this.desmarcarModeloCartao}            
          />
        ))}
      </ul>
    );
  }
}

export default ListaModeloCartao;
