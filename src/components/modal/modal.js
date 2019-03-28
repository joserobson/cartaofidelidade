
import React,{Component} from 'react'

import './modal.css';
import TipoDeAlerta from './tipo-alerta';

class Modal extends Component{

    constructor(props){
        super(props);             

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(event){
        event.preventDefault();
        document.getElementById("modalId").style.display = 'none';
    }
   

    render(){        

        return <div id="modalId" className="w3-modal">
                        <div className="w3-modal-content w3-animate-top" style={{width:'50%'}}>                        
                                <div id="alertMessage" className={'w3-panel'}>
                                    <span onClick={this.handleClose} 
                                        className="w3-button w3-display-topright">&times;</span>
                                    <h3>Teste</h3>
                                    <p>{this.props.mensagem}</p>
                                </div>                         
                        </div>      
                </div>
    }

    componentDidMount(){
        
    }

    componentDidUpdate(){        
        if (this.props.exibirMensagem){            
            document.getElementById("modalId").style.display = 'block';

            switch (this.props.tipo) {
                case TipoDeAlerta.WARNING:
                    document.getElementById("alertMessage").classList.add('w3-yellow');
                    break;
                case TipoDeAlerta.SUCESS:
                    document.getElementById("alertMessage").classList.add('w3-green');
                    break;

                default:
                    break;
            }
         }
    }

}

export default Modal;
