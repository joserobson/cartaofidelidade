
import {NotificationManager} from 'react-notifications';

class NotificationHelper{

    static timeOut = 3000;

    static ExibirAlerta(mensagem){

        if (mensagem)
            NotificationManager.warning(mensagem, '', this.timeOut);
    }

    static ExibirErro(mensagem){
        if (mensagem)
            NotificationManager.error(mensagem, '', this.timeOut);
    }

    static ExibirSucesso(mensagem){
        if (mensagem)
            NotificationManager.success(mensagem, '', this.timeOut);
    }
}


export {NotificationHelper}