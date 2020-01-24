import React, { Component } from "react";
import ItemCliente from "../item-cliente/item-cliente";
import './lista-cliente.css';

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
  }

  componentWillUnmount() {
    console.info("ummont lista cliente");
  }

  componentWillMount(){      
      
  }

  render() {
    return (
      <ul className="w3-ul w3-border" id="ulClientes" style={{cursor: "pointer"}}>
        {  this.props.clientes
          .sort(function(a,b){ 
            if (a.QtdMarcacoes < b.QtdMarcacoes) return 1;
            if (a.QtdMarcacoes > b.QtdMarcacoes) return -1;
            return 0;
          })
          .map(cliente => (
          <ItemCliente
            cliente={cliente}
            key={cliente.Telefone}
            setCliente={this.props.setCliente}
            desmarcarClientes={this.desmarcarClientes}
            editarCliente={this.props.editarCliente}
          />
        ))}
      </ul>
    );
  }
}

export default ListaDeClientes;
