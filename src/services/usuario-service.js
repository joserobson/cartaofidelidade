import { UsuarioModel } from "../models/usuario-model";
import { TipoDeComercio } from "../enums/tipo-comercio";
import { MockDadosHelper } from "../helpers/mock-dados-helper";
import { TokenService } from "./token-service";
import { ConfiguracaoHelper } from "../helpers/configuracao-helper";
import { RetornoService } from "./retorno-service";
import { ErroService } from "./erro-service";

class UsuarioService{
        

    static handleErrors(response) {
        if (!response.ok) {            
            throw Error(response.statusText);
        }
        return response;
    }

    static async ObterDadosDoUsuario(login){

        const token = TokenService.ObterTokenLocal();

        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/empresa/obterporlogin?login="+login,{
            headers: new Headers({
                'Authorization': 'bearer ' + token,
                'Content-Type': 'application/json'
            })
        });             
        

    }
    
    static async Logar(login, senha){
                   
        return await TokenService.ObterToken();                
        //TokenService.SetTokenLocal(dataToken.access_token);                           
    }    


    static ObterUsuarioLogado(){

        const jsonUsuario = localStorage.getItem("user");
        const usuario = JSON.parse(jsonUsuario);
        return usuario;
    }
    

}

export {UsuarioService}