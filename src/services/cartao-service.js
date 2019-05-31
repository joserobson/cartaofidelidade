
import { CartaoFidelidadeModel } from '../models/cartao-fidelidade-model';
import { MockDadosHelper } from '../helpers/mock-dados-helper';
import { UsuarioService } from './usuario-service';
import { StatusDoCartao } from '../enums/status-cartao';
import { ConfiguracaoHelper } from '../helpers/configuracao-helper';
import { TokenService } from './token-service';

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

    static async obterCartaoDoCliente(telefone){

        const usuarioLogado = UsuarioService.ObterUsuarioLogado();

        const token = TokenService.ObterTokenLocal();
        
        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE 
            + "api/cartaofidelidade/ObterCartao?idEmissor=" + usuarioLogado.Id + "&telefone="+telefone, {
                headers: new Headers({
                    'Authorization': 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });  


        // debugger;

        // let respostaCartaoFidelidade = {};

        // let cartaoFidelidadeStorage = localStorage.getItem(MockDadosHelper.STORAGE_NAME_CARTOES);
        
        // let clienteStorage = localStorage.getItem(MockDadosHelper.STORAGE_NAME_CLIENTES);    
        // let clientes = JSON.parse(clienteStorage);

        // //let modeloCartaoStorage = localStorage.getItem("modelosDeCartao");  
        // //let modelosDeCartao = JSON.parse(modeloCartaoStorage);
        // let usuarioLogado = UsuarioService.ObterUsuarioLogado();        

        // //procurar cartao fidelidade pelo cliente
        // let cartoes = [];
        
        // if (cartaoFidelidadeStorage){                    
        //     cartoes = JSON.parse(cartaoFidelidadeStorage);                
        // }else{
            
        //     //não existe nenhum cartão, preciso gerar um novo cartao para o cliente            
        //     return this.MontarRespostaClienteNaoPossuiCartao(clientes,usuarioLogado,telefone)
           
        // }

        // //agora já temos cartoes fidelidade cadastrados
        // //procurar se cliente já existe cartão fidelidade
        // let cartaoDoCliente = cartoes.find((cartao)=>{
        //     return cartao.Cliente.Telefone === telefone && cartao.Emissor.Id === usuarioLogado.Id && cartao.Status != StatusDoCartao.FINALIZADO;
        // })

        // //se cartao encontrado
        // if (cartaoDoCliente){
            
        //     respostaCartaoFidelidade = {
        //         clientePossuiCadastro: true,
        //         clientePossuiCartaoAberto: true,                    
        //         cartaoFidelidade: cartaoDoCliente,
        //         status: 'Aberto',                    
        //     }
            
        //     return new Promise(resolve=>{
        //         setTimeout(() => {            
        
        //             resolve(respostaCartaoFidelidade);
                    
        //         }, 2000);
                    
        //     });            
        // }else{ //cliente não possui cartao

        //     return this.MontarRespostaClienteNaoPossuiCartao(clientes,usuarioLogado,telefone)
        // }      
 
    }


    // static MontarRespostaClienteNaoPossuiCartao(clientes, usuarioLogado, telefone){

    //     //buscar o cliente
    //     let primeiroCliente = clientes.find((cliente)=>{
    //         return cliente.Telefone === telefone;
    //     })

    //     //pegar o primeiro modelo        
    //     let respostaCartaoFidelidade = {
    //         clientePossuiCadastro: true,
    //         clientePossuiCartaoAberto: false,                    
    //         cartaoFidelidade: new CartaoFidelidadeModel(primeiroCliente,usuarioLogado,[],2,StatusDoCartao.ABERTO),
    //         status: 'Pendente',                    
    //     }
        
    //     return new Promise(resolve=>{
    //         setTimeout(() => {            

    //             resolve(respostaCartaoFidelidade);
                
    //         }, 2000);
                
    //     });

    // }

    static async FecharCartao(idDoCartao){


        const token = TokenService.ObterTokenLocal();
        
        let cartao = {IdDoCartao: idDoCartao};

        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/cartaofidelidade/FecharCartao/", {
            method: 'POST',
            body: JSON.stringify(cartao),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token                
            })
        }); 


        // let cartaoFidelidadeStorage = localStorage.getItem(MockDadosHelper.STORAGE_NAME_CARTOES)
        // let cartoes = JSON.parse(cartaoFidelidadeStorage);   
        // let cartaoEncontrado = cartoes.find((cartao)=>{
        //     return cartao.Id === cartaoFechado.Id
        // });

        // cartaoEncontrado.Status = StatusDoCartao.FINALIZADO;
        // localStorage.setItem(MockDadosHelper.STORAGE_NAME_CARTOES,JSON.stringify(cartoes));

        // return new Promise(resolve=>{
        //         setTimeout(() => {
        //         resolve();
        //     }, 2000);
        // });

    }


    static async salvarCartaoFidelidade(cartao){

        console.info("Cartao-Service-> Salvar Cartão", cartao);

        const token = TokenService.ObterTokenLocal();
        
        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE + "api/cartaofidelidade/SalvarCartao/", {
            method: 'POST',
            body: JSON.stringify(cartao),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token                
            })
        }); 
        
    //     let cartaoFidelidadeStorage = localStorage.getItem(MockDadosHelper.STORAGE_NAME_CARTOES)
    //     let cartoes = [];

    //     //checar se não existe nenhum cartao
    //     if (!cartaoFidelidadeStorage){

    //         cartaoDoCliente.Ocorrencias = novasMarcacoes;
    //         cartoes.push(cartaoDoCliente);
    //     }else{

    //         cartoes = JSON.parse(cartaoFidelidadeStorage);   
    //         let cartaoEncontrado = cartoes.find((cartao)=>{
    //             return cartao.Id === cartaoDoCliente.Id
    //         })

    //         if (cartaoEncontrado){    

    //             novasMarcacoes.forEach(element => {
    //                 cartaoEncontrado.Ocorrencias.push(element);    
    //             });        
                       
    //             if (marcacoesDesbloqueadas && marcacoesDesbloqueadas.length > 0){
    //                 marcacoesDesbloqueadas.forEach(dia=>{                    
    //                     let index = cartaoEncontrado.Ocorrencias.indexOf(dia);                    
    //                     if (index > -1){
    //                         cartaoEncontrado.Ocorrencias.splice(index,1);
    //                     }
    //                 });
    //             }
                
    //         }else{

    //             cartaoDoCliente.Ocorrencias = novasMarcacoes;
    //             cartoes.push(cartaoDoCliente);
    //         }
    //     }
                
          
    //     //buscar o cartao para ver sele foi completado
    //     let cartaoFidelidade = cartoes.find((cartao)=>{
    //         return cartao.Id === cartaoDoCliente.Id
    //     })

    //     let cartaoCompleto = false;
    //     if (cartaoFidelidade.Ocorrencias.length === cartaoFidelidade.Modelo.QtdMarcacoes)
    //     {
    //         cartaoCompleto = true;
    //         cartaoFidelidade.Status = StatusDoCartao.COMPLETO;
    //     }

    //     localStorage.setItem(MockDadosHelper.STORAGE_NAME_CARTOES,JSON.stringify(cartoes));

    //     return new Promise(resolve=>{
    //         setTimeout(() => {
    //         resolve(cartaoCompleto);
    //     }, 2000);
         
    //  });

    }

}

export {CartaoService};