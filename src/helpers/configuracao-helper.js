import { UsuarioService } from "../services/usuario-service";
import { TipoDeComercio } from "../enums/tipo-comercio";

class ConfiguracaoHelper{

    //static URI_API_MAIS_FIDELIDADE = "https://cartaomaisclientes.com.br/";
    //static URI_API_MAIS_FIDELIDADE = "http://192.168.0.106/MaisFidelidade.Api/";

    static URI_API_MAIS_FIDELIDADE = this.obterUrl();
    static URI_API_TOKEN_MAIS_FIDELIDADE = this.URI_API_MAIS_FIDELIDADE + "token";
    
    static ObterIcone(){

        var usuario = UsuarioService.ObterUsuarioLogado();            

        const tipo = TipoDeComercio.ObterTipoDeComercio(usuario.TipoDeComercio)
        return tipo.ICONE;
    }

    static obterUrl(){

        if(process.env.NODE_ENV !== 'production'){

            return "http://192.168.1.2/MaisFidelidade.Api/"            
            //return process.env.API_URL_DESENV;
        }

        return "https://cartaomaisclientes.com.br/"
    }

}

export{ConfiguracaoHelper}