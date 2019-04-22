import { UsuarioModel } from "../models/usuario-model";
import { TipoDeComercio } from "../enums/tipo-comercio";

class UsuarioService{

    STORAGE_NAME = "usuarios"
    
    static Logar(){
        
        //chamar o serviço para fazer o login
            //criar um mock de usuario de um cafeteria
        var usuarioCafeteria = new UsuarioModel("123","Prosa & Café", TipoDeComercio.CAFETERIA);
        // let usuarioStorage = localStorage.getItem(this.STORAGE_NAME);
        // let usuarios = [];

        // if (!usuarioStorage){            
        //     usuarios.push(usuarioCafeteria);            
        // }else{
        //     usuarios = JSON.parse(localStorage.getItem(this.STORAGE_NAME));
        //     usuarios.push(usuarioCafeteria);        
        // }

        // localStorage.setItem(this.STORAGE_NAME,JSON.stringify(usuarios));

        return new Promise(resolve=>{
                setTimeout(() => {
                resolve(usuarioCafeteria);
            }, 2000);
             
         });


        //com o retorno eu vou setar as configurações do app
            //exemplo setar o icone

    }
    

}

export {UsuarioService}