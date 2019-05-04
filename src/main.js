import React,{Component} from "react";

import CadastrarCliente from './components/cliente/cadastrar-cliente';

import { Switch, Route, Redirect } from 'react-router-dom';

import MarcarCartao from './components/marcar-cartao/marcar-cartao';

import SelecionarClienteCartao from './components/marcar-cartao/selecionar-cliente-cartao';
import Login from "./components/login/login";

class Main extends Component{

constructor(props){
    
    super(props);

}

PossuiUsuarioLogado(){

    return localStorage.getItem('user');
}

render(){

    return <div className="w3-main" style={{marginLeft:'340px', marginRight:'75px'}}>                                               
            <Switch>
                <Route exact 
                    path='/'
                    render={(props) => 
                                (                                                    
                                    this.PossuiUsuarioLogado()
                                    ? <SelecionarClienteCartao{...props} handleModal={this.props.handleModal}/> 
                                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                )
                            }                                                                                    
                />                

                <Route 
                    path='/cadastrarCliente/:telefoneOuCpf' 
                    render={(props)=>
                             ( 
                                this.PossuiUsuarioLogado() 
                                ? <CadastrarCliente{...props} handleModal={this.props.handleModal}/>
                                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                             )
                            }
                />
                <Route 
                    path='/cadastrarCliente/' 
                    render={(props)=> 
                                (
                                    this.PossuiUsuarioLogado()
                                    ? <CadastrarCliente{...props} handleModal={this.props.handleModal}/>
                                    : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                                )
                            }
                />            
               
               <Route 
                    path='/marcarCartao/:telefone' 
                    render={(props)=> 
                            (
                                this.PossuiUsuarioLogado()
                                ? <MarcarCartao{...props} handleModal={this.props.handleModal}/>
                                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                            )
                           }
                />

                <Route path='/login' exact={true} render={(props)=><Login{...props} handleModal={this.props.handleModal}/>} />            
            </Switch>            
        </div> 
    }        
}

export default Main;