
import { TokenService } from "./token-service";
import { ConfiguracaoHelper } from "../helpers/configuracao-helper";
import { UsuarioRepositorio } from "../repositorios/usuario-repositorio";
import { TokenRepositorio } from "../repositorios/token-repositorio";


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

        return UsuarioRepositorio.ObterUsuario();
    }

    static RemoverUsuarioLogado(){
        UsuarioRepositorio.RemoverUsuario();    
    }

    static Logout(){
        UsuarioRepositorio.RemoverUsuario();
        TokenRepositorio.RemoverToken();
    }
    

}

export {UsuarioService}