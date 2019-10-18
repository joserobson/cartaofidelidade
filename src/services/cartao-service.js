
import { UsuarioService } from './usuario-service';
import { ConfiguracaoHelper } from '../helpers/configuracao-helper';
import { TokenService } from './token-service';

class  CartaoService{
        

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

    static async fecharCartao(telefone, idUsuario){

        const token = TokenService.ObterTokenLocal();
        
        let cartao = {
            Telefone: telefone,
            IdDoEmissor: idUsuario
        };

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

    static async ObterDiasMarcados(telefone){

        const usuarioLogado = UsuarioService.ObterUsuarioLogado();

        const token = TokenService.ObterTokenLocal();
        
        return await fetch(ConfiguracaoHelper.URI_API_MAIS_FIDELIDADE 
            + "api/cartaofidelidade/ObterDiasMarcados?idEmissor=" + usuarioLogado.Id + "&telefone="+telefone, {
                headers: new Headers({
                    'Authorization': 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });           
    }

}

export {CartaoService};