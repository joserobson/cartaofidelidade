
import React,{Component} from 'react'

import './modal.css';
import TipoDeAlerta from './tipo-alerta';

class Modal extends Component{

    constructor(props){
        super(props);             

        this.handleClose = this.handleClose.bind(this);
        this.handleSoFecharPopup = this.handleSoFecharPopup.bind(this);
        this.state = {titulo:""}
    }

    handleSoFecharPopup(){
        document.getElementById("modalId").style.display = 'none';  
    }

    handleClose(event){
        
        debugger;        
        document.getElementById("modalId").style.display = 'none';  
        
        event();
    }
   

    render(){        

        return <div id="modalId" className="w3-modal">                    

                        <div className="w3-modal-content w3-animate-top" style={{width:'50%'}}>                        

                                <header id="alertMessage" className="w3-container w3-red">
                                    <span onClick={this.handleSoFecharPopup} 
                                        className="w3-button w3-display-topright">&times;</span>        
                                        <h3 id="titulo"></h3>                                  
                                </header>

                                <div className="w3-container">                                                                                                         
                                    <p>{this.props.mensagem}</p>                                       
                                </div>                                

                                <footer className="w3-container w3-right-align">                                            
                                        {
                                            this.props.eventos && this.props.eventos.map((evento,index)=>{
                                                return <button type="button" key={index} className="w3-button w3-blue w3-margin-bottom w3-margin-left" onClick={()=>this.handleClose(evento.onClick)}>{evento.Nome}</button>
                                            })
                                        }
                                        
                                        {/* <button type="button" className="w3-button w3-blue w3-margin-bottom w3-margin-left" onClick={this.handleClose}>Fechar</button>                                     */}
                                </footer>                     
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
                    //document.getElementById("alertMessage").classList.add('w3-yellow');
                    document.getElementById("titulo").innerText = "Alerta";
                    break;
                case TipoDeAlerta.SUCESS:
                    //document.getElementById("alertMessage").classList.add('w3-green');
                    document.getElementById("titulo").innerText = "Sucesso";
                    break;
                case TipoDeAlerta.EVENTO_EXIBIR_MARCACAO:                    
                    document.getElementById("titulo").innerText = "Data da Marcação";
                    break;
                default:
                    break;
            }
         }
    }

}

export default Modal;
