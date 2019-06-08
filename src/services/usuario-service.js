
import { TokenService } from "./token-service";
import { ConfiguracaoHelper } from "../helpers/configuracao-helper";


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
                   
        return await TokenService.ObterToken(login,senha);                                              
    }    


    static ObterUsuarioLogado(){

        const jsonUsuario = localStorage.getItem("user");
        const usuario = JSON.parse(jsonUsuario);
        return usuario;
    }

    static RemoverUsuarioLogado(){

        const jsonUsuario = localStorage.removeItem("user");        
    }
    

}

export {UsuarioService}