
import {ClienteModel} from '../models/cliente-model';
import {CartaoModel} from '../models/cartao-model'

class  CartaoService{
    

    static CadastrarCartao(cartao){


        let cartaoStorage = localStorage.getItem("cartoes")
        let cartoes = [];
        
        if (!cartaoStorage){            
            cartoes.push(cartao);            
        }else{
            cartoes = JSON.parse(localStorage.getItem("cartoes"));
            cartoes.push(cartao);        
        }

        localStorage.setItem("cartoes",JSON.stringify(cartoes));

        return new Promise(resolve=>{
                setTimeout(() => {
                resolve(cartao);
            }, 2000);
             
         });
         
    }       

    static ObterCartoes(textoParaPesquisa){
        
        let cartoes = [];
        let cartoesEncontrados = [];

        let cartaoStorage = localStorage.getItem("cartoes");
        if (cartaoStorage){
            cartoes = JSON.parse(cartaoStorage);
        }                    

        if (cartoes.length > 0){                                     
            cartoesEncontrados = cartoes.filter((cartao)=>{
                return cartao.Nome.indexOf(textoParaPesquisa) !== -1;   
            });
        }        

        return new Promise(resolve=>{
           setTimeout(() => {            

            if (textoParaPesquisa){
                resolve(cartoesEncontrados);
            }else{
                resolve(cartoes)   
            }
            
           }, 2000);
            
        });

    }

    static obterCartoesDoCliente(nomeOUCpfDocliente){

        //1º cenário
        //Cliente possui cadastro mas não possui nenhum cartão daquela loja        
        let resposta1 = {
    
            clientePossuiCadastro: true,
            clientePossuiCartaoAberto: false,
            cliente: new ClienteModel("3299934311","robsbq@gmail.com","06542045600"),            
            cartaoFidelidade:{
                id: '',                
                CriadoEm: '',
                configuracao: new CartaoModel("Ganhe Corte Cabelo","Corte de Cabelo",10),
                status: 'Pendente',
                ocorrencias: [""]
            }
        } 
            
        //2º
        //Cliente possui cadastro e já possui um cartão aberto
        let resposta2 = {
            
            clientePossuiCadastro: true,
            clientePossuiCartaoAberto: true,
            cliente: new ClienteModel("3299934311","robsbq@gmail.com","06542045600"),            
            cartaoFidelidade:{
                id: 'abcasdasfqweqwe',                
                CriadoEm: '01/01/2010',
                configuracao: new CartaoModel("Ganhe Corte Cabelo","Corte de Cabelo",8),
                status: 'aberto',
                ocorrencias: ["01/01/2019 10:10","08/01/2019 13:10","16/01/2019 09:40"]
            }
        }

        //3º
        //Cliente não possui cadastro
        let resposta3 = {
    
            clientePossuiCadastro: false,
            clientePossuiCartaoAberto: false,
            cliente: null,            
            cartaoFidelidade:{
                id: '',                
                CriadoEm: '',
                configuracao: new CartaoModel("Ganhe Corte Cabelo","Corte de Cabelo",10),
                status: 'Pendente',
                ocorrencias: [""]
            }
        } 


        //let respostas = [resposta2];

        return new Promise(resolve=>{
            setTimeout(() => {            
 
             resolve(resposta2);
             
            }, 2000);
             
         });
 
    }

}

export {CartaoService};