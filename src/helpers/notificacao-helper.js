
import {NotificationManager} from 'react-notifications';

class NotificationHelper{

    static timeOut = 2000;

    static ExibirAlerta(mensagem){

        if (mensagem)
        {
            if (window.innerWidth < 980) {
                this.ofuscarTela(); 
              }

            NotificationManager.warning(mensagem, '', this.timeOut);
        }
    }

    static ExibirErro(mensagem){
        if (mensagem)
        {
            if (window.innerWidth < 980) {
                this.ofuscarTela(); 
              }

            NotificationManager.error(mensagem, '', this.timeOut);
        }
    }

    static ExibirSucesso(mensagem){
        if (mensagem) {
          if (window.innerWidth < 980) {
            this.ofuscarTela(); 
          }
          NotificationManager.success(mensagem, "", this.timeOut);
        }
    }   

    static ofuscarTela(){
        document.getElementById("main").style.opacity = "0.2";
        document.getElementById("header").style.opacity = "0.2";

        let t = setTimeout(() => {
          document.getElementById("main").style.opacity = "1";
          document.getElementById("header").style.opacity = "1";
        }, this.timeOut + 10);
    }

    
}


export {NotificationHelper}