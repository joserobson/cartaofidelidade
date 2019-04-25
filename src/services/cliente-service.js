

import {ClienteModel} from '../models/cliente-model'

class  ClienteService{
    
    
    static CadastrarCliente(cliente){


        let clienteStorage = localStorage.getItem("clientes")
        let clientes = [];
        
        if (!clienteStorage){            
            clientes.push(cliente);            
        }else{
             clientes = JSON.parse(localStorage.getItem("clientes"));
             clientes.push(cliente);        
        }

        localStorage.setItem("clientes",JSON.stringify(clientes));

        return new Promise(resolve=>{
                setTimeout(() => {
                resolve(cliente);
            }, 2000);
             
         });

         //return Promise.reject(new Error('fail'))
    }       

    static ObterClientes(textoParaPesquisa){
        
        let clientes = [];
        let clientesEncontrados = [];

        let clienteStorage = localStorage.getItem("clientes");
        if (clienteStorage){
            clientes = JSON.parse(clienteStorage);
        }                    

        if (clientes.length > 0){                                     
            clientesEncontrados = clientes.filter((cliente)=>{
                return cliente.Cpf.indexOf(textoParaPesquisa) !== -1 | cliente.Telefone.indexOf(textoParaPesquisa) !== -1;   
            });
        }
        

        return new Promise(resolve=>{
           setTimeout(() => {            

            if (textoParaPesquisa){
                resolve(clientesEncontrados);
            }else{
                resolve(clientes)   
            }
            
           }, 2000);
            
        });

    }

}

export {ClienteService};