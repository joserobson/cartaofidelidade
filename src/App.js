import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/header";
import Main from "./main";
import Loading from "./components/loading/loading";
import Modal from "./components/modal/modal";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { ClienteService } from "./services/cliente-service";
import { UsuarioService } from "./services/usuario-service";
import Notificacao from "./components/notificacao/notificacao";

class App extends Component {
  constructor() {
    super();

    this.handleModal = this.handleModal.bind(this);
    this.handleHeader = this.handleHeader.bind(this);

    this.state = {
      mensagem: "",
      exibirMensagem: false,
      tipo: "",
      eventos: [],
      tituloHeader:""      
    };

      setInterval(async () => {
         await ClienteService.obterNovosClientes();
      }, 5000);
    
    
    const usuario = UsuarioService.ObterUsuarioLogado();
    if (usuario){
     this.state.tituloHeader = usuario.Nome;     
    }
  }

  handleModal(mensagemModal) {
    this.setState({
      exibirMensagem: true,
      mensagem: mensagemModal.texto,
      tipo: mensagemModal.tipo,
      eventos: mensagemModal.eventos
    });
  }

  handleHeader(titulo) {
    
    this.setState({
      tituloHeader: titulo
    });
  }

  render() {
    return (
      <div>
        <Modal
          mensagem={this.state.mensagem}
          exibirMensagem={this.state.exibirMensagem}
          tipo={this.state.tipo}
          eventos={this.state.eventos}
        />
        <Loading />
        <Header titulo={this.state.tituloHeader}/>
        <NotificationContainer />     
        <Main handleModal={this.handleModal} handleHeader={this.handleHeader} />
      </div>
    );
  }

  async componentWillMount() {
    console.log('Mount app => primeira busca de clientes....')
    await ClienteService.obterNovosClientes();            
  }
  
}

export default App;
