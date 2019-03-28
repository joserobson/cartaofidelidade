

import {ClienteModel} from '../models/cliente-model'

class  ClienteService{
    

    static CadastrarCliente(cliente){

        return new Promise(resolve=>{
                setTimeout(() => {
                resolve(cliente);
            }, 2000);
             
         });

         //return Promise.reject(new Error('fail'))
    }       

    static ObterClientes(textoParaPesquisa){
        
        let clientes = []; 

        clientes.push(new ClienteModel("3299934311","robsbq@gmail.com","06542045600"))
        clientes.push(new ClienteModel("3588988988","email@yahoo.com.br","1111111111"))
        clientes.push(new ClienteModel("3511122545","joaomariajosejoa@gamil.com","233333333"))    
        
        debugger;
        let clientesEncontrados = clientes.filter((cliente)=>{
            return cliente.Cpf.indexOf(textoParaPesquisa) !== -1 | cliente.Telefone.indexOf(textoParaPesquisa) !== -1;   
        });



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