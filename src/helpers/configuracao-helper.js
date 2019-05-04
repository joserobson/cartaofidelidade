import { UsuarioService } from "../services/usuario-service";
import { Usuario } from "../models/usuario-model";

class ConfiguracaoHelper{

    
    static ObterIcone(){

        var usuario = UsuarioService.ObterUsuarioLogado();
        
        return usuario.TipoDeComercio.ICONE;
    }


}

export{ConfiguracaoHelper}