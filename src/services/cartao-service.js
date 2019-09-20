
import { CartaoFidelidadeModel } from '../models/cartao-fidelidade-model';
import { MockDadosHelper } from '../helpers/mock-dados-helper';
import { UsuarioService } from './usuario-service';
import { StatusDoCartao } from '../enums/status-cartao';
import { ConfiguracaoHelper } from '../helpers/configuracao-helper';
import { TokenService } from './token-service';

class  CartaoService{
    

    // static AtivarModeloCartao(modeloCartao){

    //     let modelos = JSON.parse(localStorage.getItem("modelosDeCartao"));

    //     modelos.forEach((item)=>{
    //         item.Ativo = false;
    //     }) 

    //     let modeloEncontrado = modelos.find((item)=>{
    //         return item.Id === modeloCartao.Id
    //     })
    //     modeloEncontrado.Ativo = true;
        
    //     localStorage.setItem("modelosDeCartao",JSON.stringify(modelos));

    // }

    // static CadastrarModeloCartao(modeloCartao){

    //     let cartaoStorage = localStorage.getItem("modelosDeCartao")
    //     let cartoes = [];
        
    //     if (!cartaoStorage){            
    //         cartoes.push(modeloCartao);            
    //     }else{
    //         cartoes = JSON.parse(localStorage.getItem("modelosDeCartao"));
    //         cartoes.push(modeloCartao);        
    //     }

    //     localStorage.setItem("modelosDeCartao",JSON.stringify(cartoes));

    //     return new Promise(resolve=>{
    //             setTimeout(() => {
    //             resolve(modeloCartao);
    //         }, 2000);
             
    //      });
         
    // }       

    // static ObterModeloDeCartoes(textoParaPesquisa){
        
    //     let cartoes = [];
    //     let cartoesEncontrados = [];

    //     let cartaoStorage = localStorage.getItem("modelosDeCartao");
    //     if (cartaoStorage){
    //         cartoes = JSON.parse(cartaoStorage);
    //     }                    

    //     if (cartoes.length > 0){                                     
    //         cartoesEncontrados = cartoes.filter((cartao)=>{
    //             return cartao.Nome.indexOf(textoParaPesquisa) !== -1;   
    //         });
    //     }        

    //     return new Promise(resolve=>{
    //        setTimeout(() => {            

    //         if (textoParaPesquisa){
    //             resolve(cartoesEncontrados);
    //         }else{
    //             resolve(cartoes)   
    //         }
            
    //        }, 2000);
            
    //     });

    // }

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
    }

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
    }

}

export {CartaoService};