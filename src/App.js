import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Main from './main'
import Loading from './components/loading/loading';
import Modal from './components/modal/modal';


class App extends Component {

  constructor(){
    super();

    this.handleModal = this.handleModal.bind(this);
    this.state = {
        mensagem: '',
        exibirMensagem: false        
    }

  }

  handleModal(mensagemModal){
    //alert(msg);
    //debugger;

    this.setState({
      exibirMensagem: true,
      mensagem: mensagemModal.texto,
      tipo: mensagemModal.tipo
    })
  }

  render() {
    return  (
      <div>       
         <Modal mensagem={this.state.mensagem} exibirMensagem={this.state.exibirMensagem} tipo={this.state.tipo}/>
         <Loading/>             
         <Header/>
         <Main handleModal={this.handleModal}/>
      </div> 
    );   
  }
}

export default App;
