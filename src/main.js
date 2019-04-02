import React,{Component} from "react";

import Home from "./components/home/home"

import GerirCartao from "./components/cartao/gerir-cartao";

import GerirCliente from "./components/cliente/gerir-cliente";

import PaginaNaoEncontrada from "./components/pagina-nao-encontrada/pagina-nao-encontrada";

import CadastrarCliente from './components/cliente/cadastrar-cliente';

import CadastrarCartao from './components/cartao/cadastrar-cartao';

import { Switch, Route, HashRouter } from 'react-router-dom';

import MarcarCartao from './components/cartao/marcar-cartao';


class Main extends Component{

constructor(props){
    
    super(props);


}


render(){

    return <div className="w3-main" style={{marginLeft:'340px', marginRight:'75px'}}>                                               
            <Switch>
                <Route exact path='/' component={Home} />
                <Route 
                    path='/gerirCartao/' 
                    render={(props)=> <GerirCartao{...props} handleModal={this.props.handleModal}/>}/>
                <Route 
                    path='/gerirCliente/' 
                    render={(props)=> <GerirCliente{...props} handleModal={this.props.handleModal}/>}/>                
                <Route 
                    path='/cadastrarCliente/' 
                    render={(props)=> <CadastrarCliente{...props} handleModal={this.props.handleModal}/>}/>

                <Route path='/cadastrarCartao/' 
                    render={(props)=> <CadastrarCartao{...props} handleModal={this.props.handleModal}/>}/>
               
               <Route path='/marcarCartao/:valorMarcacao' 
                    render={(props)=> <MarcarCartao{...props} handleModal={this.props.handleModal}/>}/>

                <Route path='*' exact={true} component={PaginaNaoEncontrada} />            
            </Switch>            
        </div> 
    }        
}

export default Main;