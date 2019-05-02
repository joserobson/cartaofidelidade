import React,{Component} from "react";

import Home from "./components/home/home"

import GerirModeloCartao from "./components/modelo-cartao/gerir-modelo-cartao";

import GerirCliente from "./components/cliente/gerir-cliente";

import PaginaNaoEncontrada from "./components/pagina-nao-encontrada/pagina-nao-encontrada";

import CadastrarCliente from './components/cliente/cadastrar-cliente';

import CadastrarModeloCartao from './components/modelo-cartao/cadastrar-modelo-cartao';

import { Switch, Route, Redirect } from 'react-router-dom';

import MarcarCartao from './components/marcar-cartao/marcar-cartao';

import SelecionarClienteCartao from './components/marcar-cartao/selecionar-cliente-cartao';
import Login from "./components/login/login";

import {PrivateRoute} from "./PrivateRoute";
class Main extends Component{

constructor(props){
    
    super(props);


}


render(){

    return <div className="w3-main" style={{marginLeft:'340px', marginRight:'75px'}}>                                               
            <Switch>
                <Route exact 
                    path='/'
                    render={
                            (props) => (                                                    
                                localStorage.getItem('user')
                                ? <SelecionarClienteCartao{...props} handleModal={this.props.handleModal}/> 
                                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                            )}                                                                                    
                        />
                <Route 
                    path='/gerirModeloCartao/' 
                    render={(props)=> <GerirModeloCartao{...props} handleModal={this.props.handleModal}/>}/>
                <Route 
                    path='/gerirCliente/' 
                    render={(props)=> <GerirCliente{...props} handleModal={this.props.handleModal}/>}/>                
                <Route 
                    path='/cadastrarCliente/:telefoneOuCpf' 
                    render={(props)=> <CadastrarCliente{...props} handleModal={this.props.handleModal}/>}/>
                <Route 
                    path='/cadastrarCliente/' 
                    render={(props)=> <CadastrarCliente{...props} handleModal={this.props.handleModal}/>}/>

                <Route 
                    path='/cadastrarModeloCartao/' 
                    render={(props)=> <CadastrarModeloCartao{...props} handleModal={this.props.handleModal}/>}/>
               
               <Route 
                    path='/marcarCartao/:telefone' 
                    render={(props)=> <MarcarCartao{...props} handleModal={this.props.handleModal}/>}/>

                <Route path='/login' exact={true} component={Login} />            
            </Switch>            
        </div> 
    }        
}

export default Main;