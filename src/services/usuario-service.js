import { UsuarioModel } from "../models/usuario-model";
import { TipoDeComercio } from "../enums/tipo-comercio";
import { MockDadosHelper } from "../helpers/mock-dados-helper";

class UsuarioService{
    
    
    static Logar(login, senha){
        
        var usuarioLogado;

        if (login === "Prosa&Cafe" && senha === "123"){
                usuarioLogado = MockDadosHelper.ObterEmissor(0);
                localStorage.setItem("user",JSON.stringify(usuarioLogado));
            }
        else{
                if (login === "PontoDoAcai" && senha === "123")
                {
                    usuarioLogado = MockDadosHelper.ObterEmissor(1);
                    localStorage.setItem("user",JSON.stringify(usuarioLogado));
                }else
                {
                    if (login === "BarbeariaImpério" && senha === "123")
                    {
                        usuarioLogado = MockDadosHelper.ObterEmissor(2);
                        localStorage.setItem("user",JSON.stringify(usuarioLogado));
                    }
                }
            }                    

        return new Promise(resolve=>{
                setTimeout(() => {
                resolve(usuarioLogado);
            }, 2000);
             
         });


        //com o retorno eu vou setar as configurações do app
            //exemplo setar o icone

    }

    static ObterUsuarioLogado(){

        const jsonUsuario = localStorage.getItem("user");
        const usuario = JSON.parse(jsonUsuario);
        return usuario;
    }
    

}

export {UsuarioService}