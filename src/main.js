import React,{Component} from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import CadastrarCliente from './components/cliente/cadastrar-cliente/cadastrar-cliente';
import MarcarCartao from './components/marcar-cartao/marcar-cartao';
import Login from "./components/login/login";
import TabMarcarCartao from "./components/marcar-cartao/tab-marcar-cartao/tab-marcar-cartao";
import { UsuarioService } from "./services/usuario-service";

class Main extends Component{

constructor(props){
    
    super(props);

}

PossuiUsuarioLogado(){
    return UsuarioService.ObterUsuarioLogado();    
}

render(){

    return <div className="w3-main" style={{marginLeft:'340px', marginRight:'75px'}}>                                               
            <Switch>
                <Route exact 
                    path='/'
                    render={(props) => 
                                (                                                    
                                    this.PossuiUsuarioLogado()                                    
                                    ? <TabMarcarCartao{...props} handleModal={this.props.handleModal}/> 
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