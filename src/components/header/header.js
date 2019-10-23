import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'
import { UsuarioService } from '../../services/usuario-service';



class Header extends Component{

    constructor(props){
        super(props);
        this.openMenuClick = this.openMenuClick.bind(this);
        this.closeMenuClick = this.closeMenuClick.bind(this);        
        this.logout = this.logout.bind(this);
        this.handleClickLimparCache = this.handleClickLimparCache.bind(this);
        
        this.state = {
            titulo: props.titulo
        };
    }

    openMenuClick(){
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("myOverlay").style.display = "block";
    }

    closeMenuClick(){
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("myOverlay").style.display = "none";
    }

    handleClickLimparCache(){        
    
    }

    logout(){        
        UsuarioService.Logout();                
    }

    render(){
        return (
                <div>
                    <nav className="w3-sidebar w3-red w3-collapse w3-top w3-large w3-padding" style={{zIndex:'3', width:'300px', fontWeight:'bold'}} id="mySidebar">
                        <a href="javascript:void(0)" onClick={this.closeMenuClick} className="w3-button w3-hide-large w3-display-topleft" 
                            style={{width:'100%', fontSize: '22px'}}>Fechar Menu</a>

                        <div className="w3-container">                           
                            <h3 className="w3-padding-64"><b>{this.state.titulo}</b></h3>                            
                        </div>

                        <div className="w3-bar-block">
                           
                            <NavLink onClick={this.closeMenuClick} className="w3-bar-item w3-button w3-hover-white" to="/">Marcar Cartão</NavLink>                            
                            <NavLink onClick={this.logout} className="w3-bar-item w3-button w3-hover-white" to="/">Sair</NavLink>
                        </div>
                    </nav>     
                            
                    <header className="w3-container w3-top w3-hide-large w3-red w3-xlarge w3-padding">
                        <a href="javascript:void(0)" className="w3-button w3-red w3-margin-right" onClick={this.openMenuClick}>☰</a>
                        <span className="w3-display-middle" id="tituloView">{this.state.titulo} </span>
                    </header>

                    <div className="w3-overlay w3-hide-large" onClick={this.closeMenuClick} style={{cursor:'pointer'}} title="close side menu" id="myOverlay"></div>
                </div>
        );
    }

    componentDidUpdate(prevProps){
                      

        if (this.props.titulo !== prevProps.titulo){
            this.setState({
                titulo: this.props.titulo
            });
        }
    }

    componentDidMount(){
                        
    }
}

export default Header;