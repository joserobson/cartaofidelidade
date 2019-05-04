import React, { Component } from 'react';
import { UsuarioService } from '../../services/usuario-service';
import { ConfiguracaoHelper } from '../../helpers/configuracao-helper';
import Loading from '../loading/loading';
class Login extends Component
{

    constructor(props){
        super(props)

        this.state = {
            userName: '',
            password:'',
            lembrarSenha: true,
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleFormSubmit(event){        

        event.preventDefault();

        Loading.show();

        let resp = UsuarioService.Logar(this.state.userName,this.state.password)
        resp.then((usuario)=>{

            Loading.close();
                                            
            this.props.history.push("/");
        });


    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }


    render(){

        return <div style={{ marginTop: '75px' }}>

                    <div className="w3-center">
                        <img src={require("./img_avatar4.png")} alt="Avatar" style={{width:'120px'}} className="w3-circle w3-margin-top"/>
                    </div>
                    
                    <form onSubmit={this.handleFormSubmit} className="w3-container">
                        <div className="w3-section">
                            <label><b>Login</b></label>
                            <input className="w3-input w3-border w3-margin-bottom" type="text" placeholder="Login" name="userName"  value={this.state.userName}  onChange={this.handleInputChange} required/>

                            <label><b>Senha</b></label>
                            <input className="w3-input w3-border" type="password" placeholder="Senha" name="password" value={this.state.password} onChange={this.handleInputChange} required/>

                            <button className="w3-button w3-block w3-red w3-section w3-padding" type="submit">Login</button>
                                <label>
                                    <input className="w3-check w3-margin-top" type="checkbox" checked="checked" name="lembrarSenha" checked={this.state.lembrarSenha} onChange={this.handleInputChange}/> Lembrar Senha
                                </label>
                        </div>

                        <div className="w3-container w3-border-top w3-padding-16" style={{backgroundColorolor:'#f1f1f1'}}>                            
                            <span className="w3-right w3-padding w3-hide-small">Esqueci <a href="#">Senha?</a></span>
                        </div>
                    </form>
                </div>
    }


}

export default Login