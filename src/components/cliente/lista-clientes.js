import React, { Component } from "react";

import ItemCliente from "./item-cliente";

class ListaDeClientes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clienteSelecionado: null
    };
  }

  desmarcarClientes() {
    var ulClientes = document.querySelectorAll("ul[id*=ulClientes] li");
    ulClientes.forEach(element => {
      element.classList.remove("w3-red");
    });
  }

  addEventoDestacarClienteSelecionado() {
    var lisVermelhos = document.querySelectorAll(
      "ul[id*=ulClientes] li.w3-red"
    );

    if (lisVermelhos.length === 0) {
      let ulClientes = document.querySelectorAll("ul[id*=ulClientes] li");

      if (ulClientes.length > 0) ulClientes[0].classList.add("w3-red");
    }
  }

  componentDidUpdate() {
    //this.addEventoDestacarClienteSelecionado();
  }

  componentWillUnmount() {
    console.info("ummont lista cliente");
  }

  componentWillMount(){      
      
  }

  render() {
    return (
      <ul className="w3-ul w3-border" id="ulClientes" style={{cursor: "pointer"}}>
        {this.props.clientes.map(cliente => (
          <ItemCliente
            cliente={cliente}
            key={cliente.Cpf}
            setCliente={this.props.setCliente}
            desmarcarClientes={this.desmarcarClientes}
          />
        ))}
      </ul>
    );
  }
}

export default ListaDeClientes;
