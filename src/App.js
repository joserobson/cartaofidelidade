import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Main from './main'
import Loading from './components/loading/loading';
import Modal from './components/modal/modal';
import {NotificationContainer} from 'react-notifications';


class App extends Component {

  constructor(){
    super();

    //criar amostra de dados para teste do app
    //console.log("Zerar os dados");
    //MockDadosHelper.ZerarDados();
    //MockDadosHelper.carregarDadosDeTeste();

    this.handleModal = this.handleModal.bind(this);      
    
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
         <NotificationContainer/>
         <Main handleModal={this.handleModal}/>
      </div> 
    );   
  }
}

export default App;
