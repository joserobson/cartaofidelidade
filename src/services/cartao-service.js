
import {ClienteModel} from '../models/cliente-model';
import {ModeloCartaoFidelidadeModel} from '../models/modelo-cartao-model'
import { ClienteService } from './cliente-service';
import { CartaoFidelidadeModel } from '../models/cartao-fidelidade-model';

class  CartaoService{
    

    static AtivarModeloCartao(modeloCartao){

        let modelos = JSON.parse(localStorage.getItem("modelosDeCartao"));

        modelos.forEach((item)=>{
            item.Ativo = false;
        }) 

        let modeloEncontrado = modelos.find((item)=>{
            return item.Id === modeloCartao.Id
        })
        modeloEncontrado.Ativo = true;
        
        localStorage.setItem("modelosDeCartao",JSON.stringify(modelos));

    }

    static CadastrarModeloCartao(modeloCartao){

        let cartaoStorage = localStorage.getItem("modelosDeCartao")
        let cartoes = [];
        
        if (!cartaoStorage){            
            cartoes.push(modeloCartao);            
        }else{
            cartoes = JSON.parse(localStorage.getItem("modelosDeCartao"));
            cartoes.push(modeloCartao);        
        }

        localStorage.setItem("modelosDeCartao",JSON.stringify(cartoes));

        return new Promise(resolve=>{
                setTimeout(() => {
                resolve(modeloCartao);
            }, 2000);
             
         });
         
    }       

    static ObterModeloDeCartoes(textoParaPesquisa){
        
        let cartoes = [];
        let cartoesEncontrados = [];

        let cartaoStorage = localStorage.getItem("modelosDeCartao");
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

    static obterCartaoDoCliente(telefone){

        //debugger;

        let respostaCartaoFidelidade = {};

        let cartaoFidelidadeStorage = localStorage.getItem("cartaoFidelidade");
        
        let clienteStorage = localStorage.getItem("clientes");    
        let clientes = JSON.parse(clienteStorage);

        let modeloCartaoStorage = localStorage.getItem("modelosDeCartao");  
        let modelosDeCartao = JSON.parse(modeloCartaoStorage);
        let modeloAtivo = modelosDeCartao.find((modelo)=>{return modelo.Ativo});

        //procurar cartao fidelidade pelo cliente
        let cartoes = [];
        
        if (cartaoFidelidadeStorage){                    
            cartoes = JSON.parse(localStorage.getItem("cartaoFidelidade"));                
        }else{
            
            //não existe nenhum cartão, preciso gerar um novo cartao para o cliente            
            return this.MontarRespostaClienteNaoPossuiCartao(clientes,modeloAtivo,telefone)
           
        }

        //agora já temos cartoes fidelidade cadastrados
        //procurar se cliente já existe cartão fidelidade
        let cartaoDoCliente = cartoes.find((cartao)=>{
            return cartao.Cliente.Telefone === telefone && cartao.Modelo.Id === modeloAtivo.Id;
        })

        //se cartao encontrado
        if (cartaoDoCliente){
            
            respostaCartaoFidelidade = {
                clientePossuiCadastro: true,
                clientePossuiCartaoAberto: true,                    
                cartaoFidelidade: cartaoDoCliente,
                status: 'Aberto',                    
            }
            
            return new Promise(resolve=>{
                setTimeout(() => {            
        
                    resolve(respostaCartaoFidelidade);
                    
                }, 2000);
                    
            });            
        }else{ //cliente não possui cartao

            return this.MontarRespostaClienteNaoPossuiCartao(clientes,modeloAtivo,telefone)
        }      
 
    }


    static MontarRespostaClienteNaoPossuiCartao(clientes, modeloAtivo, telefone){

        //buscar o cliente
        let primeiroCliente = clientes.find((cliente)=>{
            return cliente.Telefone === telefone;
        })

        //pegar o primeiro modelo        

        let respostaCartaoFidelidade = {
            clientePossuiCadastro: true,
            clientePossuiCartaoAberto: false,                    
            cartaoFidelidade: new CartaoFidelidadeModel(primeiroCliente,modeloAtivo,[]),
            status: 'Pendente',                    
        }
        
        return new Promise(resolve=>{
            setTimeout(() => {            

                resolve(respostaCartaoFidelidade);
                
            }, 2000);
                
        });

    }

    static salvarCartaoFidelidade(cartaoDoCliente, novasMarcacoes){

        //debugger;
        let cartaoFidelidadeStorage = localStorage.getItem("cartaoFidelidade")
        let cartoes = [];

        //checar se não existe nenhum cartao
        if (!cartaoFidelidadeStorage){

            cartaoDoCliente.Ocorrencias = novasMarcacoes;
            cartoes.push(cartaoDoCliente);
        }else{

            cartoes = JSON.parse(localStorage.getItem("cartaoFidelidade"));   
            let cartaoEncontrado = cartoes.find((cartao)=>{
                return cartao.Id === cartaoDoCliente.Id
            })

            if (cartaoEncontrado){    

                novasMarcacoes.forEach(element => {
                    cartaoEncontrado.Ocorrencias.push(element);    
                });                
                
            }else{

                cartaoDoCliente.Ocorrencias = novasMarcacoes;
                cartoes.push(cartaoDoCliente);
            }
        }
                
          
        localStorage.setItem("cartaoFidelidade",JSON.stringify(cartoes));

        return new Promise(resolve=>{
            setTimeout(() => {
            resolve();
        }, 2000);
         
     });

    }

}

export {CartaoService};