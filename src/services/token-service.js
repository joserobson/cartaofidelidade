import { TokenRepositorio } from "../repositorios/token-repositorio";

class TokenService{

    static URL_API_TOKEN = "http://192.168.1.4/MaisFidelidade.Api/token";

    static async ObterToken(userName, password){

          //pegar o token no servidor e testa as credencias
        return await fetch(this.URL_API_TOKEN,{
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