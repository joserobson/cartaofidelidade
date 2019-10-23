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

    //  setInterval(async () => {
    //    await ClienteService.obterNovosClientes();
    //  }, 10000);
    
    
    const usuario = UsuarioService.ObterUsuarioLogado();
    if (usuario){
     this.state.tituloHeader = usuario.Nome;     
    }
  }

  // async obterMaiorDataDeCadastro() {
  //   const resposta = await ClienteService.ObterMaiorDataDeCadastro();

  //   if (resposta.ok) {
  //     const maiorData = await resposta.json();
  //     console.log("Salvando Maior Data de Cadastro", maiorData);

  //     UsuarioRepositorio.SalvarMaiorDataCadastroCliente(maiorData);
  //   }
  // }

  // async obterNovosClientes() {
  //   try {
  //     if (navigator.onLine) {
  //       const usuario = UsuarioRepositorio.ObterUsuario();
  //       if (usuario) {
  //         const resp = await ClienteService.ObterConsumidoresPorDataCadastro();

  //         if (resp.ok) {
  //           const novosClientes = await resp.json();
  //           console.log("novos clientes", novosClientes);

  //           if (novosClientes && novosClientes.length > 0) {
  //             const repo = await RepositorioFactory.getClienteRepositorio();
  //             await repo.adicionaNovosClientes(novosClientes);

  //             await this.obterMaiorDataDeCadastro();
  //           }
  //         }
  //       }
  //     }      
  //   } catch (error) {
  //     console.log("erro ao obter novos clientes", error);
  //   }
  // }

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
