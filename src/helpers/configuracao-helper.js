import { UsuarioService } from "../services/usuario-service";
import { TipoDeComercio } from "../enums/tipo-comercio";

class ConfiguracaoHelper{

    //static URI_API_MAIS_FIDELIDADE = "https://cartaomaisclientes.com.br/";
    static URI_API_MAIS_FIDELIDADE = "http://192.168.0.106/MaisFidelidade.Api/";
    static URI_API_TOKEN_MAIS_FIDELIDADE = this.URI_API_MAIS_FIDELIDADE + "token";
    
    static ObterIcone(){

        var usuario = UsuarioService.ObterUsuarioLogado();            

        const tipo = TipoDeComercio.ObterTipoDeComercio(usuario.TipoDeComercio)
        return tipo.ICONE;
    }

}

export{ConfiguracaoHelper}