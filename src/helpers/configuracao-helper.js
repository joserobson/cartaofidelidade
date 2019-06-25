import { UsuarioService } from "../services/usuario-service";
import { TipoDeComercio } from "../enums/tipo-comercio";

class ConfiguracaoHelper{

    static URI_API_MAIS_FIDELIDADE = "http://192.168.1.2/MaisFidelidade.Api/";
    
    static ObterIcone(){

        var usuario = UsuarioService.ObterUsuarioLogado();            

        const tipo = TipoDeComercio.ObterTipoDeComercio(usuario.TipoDeComercio)
        return tipo.ICONE;
    }

}

export{ConfiguracaoHelper}