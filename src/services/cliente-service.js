

import {ClienteModel} from '../models/cliente-model'
import { MockDadosHelper } from '../helpers/mock-dados-helper';
import { UsuarioService } from './usuario-service';
import { ConfiguracaoHelper } from '../helpers/configuracao-helper';
import { TokenService } from "./token-service";

class  ClienteService{
    
    
    static async CadastrarCliente(cliente){

        const token = TokenService.ObterTokenLocal();

        debugger;
        const responseFetch = fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/consumidor/InserirConsumidor/", {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + token                
            })
        });

        return responseFetch.then(async response=>{
            let resp =  await response.json();
            console.log(response);            
            if (response.ok)
                return Promise.resolve(resp);
            else
                return Promise.reject(resp);
        })
        .catch(error=>{
            return Promise.reject(error);
        })
        

        // let clienteStorage = localStorage.getItem("clientes")
        // let clientes = [];
        
        // if (!clienteStorage){            
        //     clientes.push(cliente);            
        // }else{
        //      clientes = JSON.parse(localStorage.getItem("clientes"));
        //      clientes.push(cliente);        
        // }

        // localStorage.setItem("clientes",JSON.stringify(clientes));

        // return new Promise(resolve=>{
        //         setTimeout(() => {
        //         resolve(cliente);
        //     }, 2000);
             
        //  });

         //return Promise.reject(new Error('fail'))
    }       

    static async ObterClientes(textoParaPesquisa){
                
        const token = TokenService.ObterTokenLocal();

        try {
            const response = await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/consumidor/ObterPorTelefoneOuCpf?valor=" + textoParaPesquisa, {
                headers: new Headers({
                    'Authorization': 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });
            return await response.json();
        }
        catch (erro) {
            console.error(erro);
            alert(erro);
        }

        // let clientes = [];
        // let clientesEncontrados = [];

        // let clienteStorage = localStorage.getItem("clientes");
        // if (clienteStorage){
        //     clientes = JSON.parse(clienteStorage);
        // }                    

        // if (clientes.length > 0){                                     
        //     clientesEncontrados = clientes.filter((cliente)=>{
        //         return cliente.Cpf.indexOf(textoParaPesquisa) !== -1 | cliente.Telefone.indexOf(textoParaPesquisa) !== -1;   
        //     });
        // }
        

        // return new Promise(resolve=>{
        //    setTimeout(() => {            

        //     if (textoParaPesquisa){
        //         resolve(clientesEncontrados);
        //     }else{
        //         resolve(clientes)   
        //     }
            
        //    }, 2000);
            
        // });

    }

    static obterTopClientes(){       

        //pegar o id do usuario
        var usuario = UsuarioService.ObterUsuarioLogado();

        const token = TokenService.ObterTokenLocal();

        return fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/empresa/ObterConsumidoresMaisFrequentes?id="+usuario.Id+"&top="+10,{
            headers: new Headers({
                'Authorization': 'bearer ' + token,
                'Content-Type': 'application/json'
            })
        })
        .then(async response => {
                
                let resp = await response.json();              
                if (!response.ok){
                    return Promise.reject(resp);
                }else{
                    return Promise.resolve(resp);
                }
        })
        .catch(erro=> Promise.reject(erro))

    }

}

export {ClienteService};