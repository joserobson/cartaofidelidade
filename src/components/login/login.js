import React, { Component } from 'react';
import { UsuarioService } from '../../services/usuario-service';
import { ConfiguracaoHelper } from '../../helpers/configuracao-helper';
import Loading from '../loading/loading';
import TipoDeAlerta from "../modal/tipo-alerta";
import { TokenService } from '../../services/token-service';
import { UsuarioRepositorio } from '../../repositorios/usuario-repositorio';
import { Token } from '../../models/token-model';
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

    async ObterDadosDoUsuario(){
        const respostaObterDados = await UsuarioService.ObterDadosDoUsuario(this.state.userName);
                        
        Loading.close();

        if (respostaObterDados.ok){

            const usuario = await respostaObterDados.json();
            usuario.Login = this.state.userName;
            //usuario.Senha = this.state.password;

            console.log("Usuario Logado:", usuario);                      
            UsuarioRepositorio.SalvarUsuario(usuario);

            this.props.history.push("/");
        }else{

            const erro = await respostaObterDados.json();                
            
            let mensagemModal = {
                texto: erro.Message,
                tipo: TipoDeAlerta.WARNING
            }

            if (respostaObterDados.status === 401 )
            {
                
                UsuarioService.Logout();

                this.props.history.push("/");

                mensagemModal.texto = "Problema ao autenticar os dados, faça o Login Novamente.";
            }    
            
            this.props.handleModal(mensagemModal)
        }
    }


    async handleFormSubmit(event){        

        event.preventDefault();

        Loading.show();

        const respostaLogar = await UsuarioService.Logar(this.state.userName,this.state.password);

        if (respostaLogar.ok){

            const respostaToken = await respostaLogar.json();

            let dataExpiracao = new Date();
            dataExpiracao.setSeconds(dataExpiracao.getSeconds() + respostaToken.expires_in);
            
            let token = new Token(respostaToken.access_token, dataExpiracao);
            TokenService.SetTokenLocal(token);  

            this.ObterDadosDoUsuario();
        }else{

            const error = await respostaLogar.json()
            console.error(error);
            
            Loading.close();
            
            let mensagemModal = {
                texto: "Não foi Possível Logar no Aplicativo, entre em contato com o administrador do sistema.",
                tipo: TipoDeAlerta.WARNING
            }
    
            this.props.handleModal(mensagemModal);
        }
            
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