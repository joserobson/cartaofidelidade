import { TokenRepositorio } from "../repositorios/token-repositorio";
import { ConfiguracaoHelper } from "../helpers/configuracao-helper";

class TokenService{    

    static async ObterToken(userName, password){

          //pegar o token no servidor e testa as credencias
        return await fetch(ConfiguracaoHelper.URI_API_TOKEN_MAIS_FIDELIDADE,{
            method:'POST',
            body:`userName=${userName}&password=${password}&grant_type=password`,
            headers: new Headers({
                'Content-Type':'application/x-www-form-urlencoded'
            })
        });        
    }

    static ObterTokenLocal(){

        const token = TokenRepositorio.ObterToken();                
        return token.Id;
    }

    static SetTokenLocal(token){
        TokenRepositorio.SalvarToken(token);
    }
}

export {TokenService}