
class TokenService{

    static URL_API_TOKEN = "http://localhost/MaisFidelidade.Api/token";

    static async  ObterToken(){

          //pegar o token no servidor e testar as credencias
        return await fetch(this.URL_API_TOKEN,{
            method:'POST',
            body:"userName=123&password=123&grant_type=password",
            headers: new Headers({
                'Content-Type':'application/x-www-form-urlencoded'
            })
        });        
    }

    static ObterTokenLocal(){
        return localStorage.getItem("acess_token");
    }

    static SetTokenLocal(token){
        localStorage.setItem("acess_token",token);
    }
}

export {TokenService}