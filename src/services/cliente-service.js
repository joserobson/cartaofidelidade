
import { UsuarioService } from './usuario-service';
import { ConfiguracaoHelper } from '../helpers/configuracao-helper';
import { TokenService } from "./token-service";
import { UsuarioRepositorio } from '../repositorios/usuario-repositorio';
import { RepositorioFactory } from '../util/repositorio-factory';

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

    static async obterMaiorDataDeCadastro() {
        const resposta = await ClienteService.ObterMaiorDataDeCadastro();
    
        if (resposta.ok) {
          const maiorData = await resposta.json();
          console.log("Salvando Maior Data de Cadastro", maiorData);
    
          UsuarioRepositorio.SalvarMaiorDataCadastroCliente(maiorData);
        }
      }

    static async obterNovosClientes() {
        try {
          if (navigator.onLine) {
            const usuario = UsuarioRepositorio.ObterUsuario();
            if (usuario) {
              const resp = await ClienteService.ObterConsumidoresPorDataCadastro();
    
              if (resp.ok) {
                const novosClientes = await resp.json();
                console.log("novos clientes", novosClientes);
    
                if (novosClientes && novosClientes.length > 0) {
                  const repo = await RepositorioFactory.getClienteRepositorio();
                  await repo.adicionaNovosClientes(novosClientes);
    
                  await this.obterMaiorDataDeCadastro();
                }
              }
            }
          }      
        } catch (error) {
          console.log("erro ao obter novos clientes", error);
        }
      } 
}

export {ClienteService};