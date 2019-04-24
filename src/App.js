import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Main from './main'
import Loading from './components/loading/loading';
import Modal from './components/modal/modal';
import { ConfiguracaoHelper } from './helpers/configuracao-helper';
import {TipoDeComercio} from './enums/tipo-comercio';
import { UsuarioService } from './services/usuario-service';


class App extends Component {

  constructor(){
    super();

    this.handleModal = this.handleModal.bind(this);      
    
    //essa parte vai para tela de login
    let respostaLoginUsuario = UsuarioService.Logar();
    respostaLoginUsuario
      .then((usuario)=>{
          ConfiguracaoHelper.TIPO_DE_COMERCIO = usuario.TipoDeComercio;
      });

    
    this.state = {
        mensagem: '',
        exibirMensagem: false,
        tipo:'',
        eventos:[]        
    }    

  }

  handleModal(mensagemModal){
    
      this.setState({
        exibirMensagem: true,
        mensagem: mensagemModal.texto,
        tipo: mensagemModal.tipo,
        eventos: mensagemModal.eventos      
      });      
  }

  render() {
    return  (
      <div>       
         <Modal mensagem={this.state.mensagem} 
                exibirMensagem={this.state.exibirMensagem} 
                tipo={this.state.tipo}
                eventos={this.state.eventos}
          />
         <Loading/>             
         <Header/>
         <Main handleModal={this.handleModal}/>
      </div> 
    );   
  }
}

export default App;
