
import {NotificationManager} from 'react-notifications';

class NotificationHelper{

    static timeOut = 3000;

    static ExibirAlerta(mensagem){

        NotificationManager.warning(mensagem, '', this.timeOut);
    }

    static ExibirErro(mensagem){

        NotificationManager.error(mensagem, '', this.timeOut);
    }

    static ExibirSucesso(mensagem){

        NotificationManager.success(mensagem, '', this.timeOut);
    }
}


export {NotificationHelper}