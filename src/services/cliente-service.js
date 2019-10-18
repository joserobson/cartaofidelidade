
import { UsuarioService } from './usuario-service';
import { ConfiguracaoHelper } from '../helpers/configuracao-helper';
import { TokenService } from "./token-service";
import { UsuarioRepositorio } from '../repositorios/usuario-repositorio';

class ClienteService{
    
    
    static async CadastrarCliente(cliente){

        const token = TokenService.ObterTokenLocal();

        var usuario = UsuarioService.ObterUsuarioLogado();
        cliente.EmpresaAssociada = usuario;
        
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

        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/empresa/ObterConsumidoresMaisFrequentes?idDaEmpresa="+usuario.Id+"&top="+1000,{
            headers: new Headers({
                'Authorization': 'bearer ' + token,
                'Content-Type': 'application/json'
            })
        })        

    }

    static async ObterClientesDoUsuarioLogado(){
                
        const token = TokenService.ObterTokenLocal();

        var usuario = UsuarioService.ObterUsuarioLogado();
        
        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/consumidor/ObterPorEmpresa?idDaEmpresa=" + usuario.Id, {
                headers: new Headers({
                    'Authorization': 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });                

    }

    static async ObterMaiorDataDeCadastro(){
                
        const token = TokenService.ObterTokenLocal();

        var usuario = UsuarioService.ObterUsuarioLogado();
        
        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/consumidor/ObterMaiorDataDeCadastro?idDaEmpresa=" + usuario.Id, {
                headers: new Headers({
                    'Authorization': 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });                

    }

    static async ObterConsumidoresPorDataCadastro(){
                
        const token = TokenService.ObterTokenLocal();

        const usuario = UsuarioService.ObterUsuarioLogado();
        const maiorDataCadastro = UsuarioRepositorio.ObterMaiorDataDeCadastro();
        
        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE
             + "api/consumidor/ObterConsumidoresPorDataCadastro?idDaEmpresa=" + usuario.Id + "&dataCadastro=" + maiorDataCadastro, {
                headers: new Headers({
                    'Authorization': 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });                

    }

}

export {ClienteService};