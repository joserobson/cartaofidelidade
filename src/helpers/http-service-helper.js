import { UsuarioService } from "../services/usuario-service";
import { NotificationHelper } from "./notificacao-helper";
import Loading from "../components/loading/loading";

class HttpServiceHelper{

    
    
     static async InvocarServico(servico){                        

        Loading.show();   
        
        const resposta = await servico();

        Loading.close();

        if (resposta.ok)
            return resposta;

        if (resposta.status === 401){                
        
            UsuarioService.RemoverUsuarioLogado();
            window.location.reload();            
        }
        
        const erro = await resposta.json();
        NotificationHelper.ExibirErro(erro.Message);

        return resposta;
    }


}

export{HttpServiceHelper}