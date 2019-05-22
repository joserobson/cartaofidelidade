import { UsuarioService } from "../services/usuario-service";
import { Usuario } from "../models/usuario-model";

class ConfiguracaoHelper{

    static URI_API_MAIS_FIDELIDADE = "http://localhost/MaisFidelidade.Api/";
    
    static ObterIcone(){

        var usuario = UsuarioService.ObterUsuarioLogado();
        
        return usuario.TipoDeComercio.ICONE;
    }


}

export{ConfiguracaoHelper}