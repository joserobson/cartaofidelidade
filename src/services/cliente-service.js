
import { UsuarioService } from './usuario-service';
import { ConfiguracaoHelper } from '../helpers/configuracao-helper';
import { TokenService } from "./token-service";

class ClienteService{
    
    
    static async CadastrarCliente(cliente){

        const token = TokenService.ObterTokenLocal();
        
        let acao = "InserirConsumidor";
        let metodo = "POST";
        if (cliente.Id){
            acao = "EditarConsumidor";
            metodo = "PUT";
        } 

        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/consumidor/" + acao + "/", {
            method: metodo,
            body: JSON.stringify(cliente),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token                
            })
        });                     
    }       

    static async ObterClientesPor(telefone){
                
        const token = TokenService.ObterTokenLocal();
        
        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/consumidor/ObterClientesPorTelefone?telefone=" + telefone, {
                headers: new Headers({
                    'Authorization': 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });                

    }

    static async obterTopClientes(){       

        //pegar o id do usuario
        var usuario = UsuarioService.ObterUsuarioLogado();

        const token = TokenService.ObterTokenLocal();

        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/empresa/ObterConsumidoresMaisFrequentes?idDaEmpresa="+usuario.Id+"&top="+10,{
            headers: new Headers({
                'Authorization': 'bearer ' + token,
                'Content-Type': 'application/json'
            })
        })        

    }

}

export {ClienteService};