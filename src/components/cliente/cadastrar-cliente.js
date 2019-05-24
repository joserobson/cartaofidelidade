
import React, {Component} from "react";
import { ClienteModel } from "../../models/cliente-model";
import { ClienteService } from "../../services/cliente-service";
import Loading from "../loading/loading"; 
import MaskedInput from "react-maskedinput";
import TipoDeAlerta from "../modal/tipo-alerta";
class CadastrarCliente extends Component{    

    constructor(props){
        super(props);

        this.state = {
            telefone: '',
            cpf: '',
            email:'',
            irParaTelaDeCartao:false
        }

        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTelefoneChange = this.handleTelefoneChange.bind(this);
        this.handleCpfChange = this.handleCpfChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);        
    }  


     handleSubmit = async event =>{
        
        Loading.show();

        event.preventDefault();

        let cliente = new ClienteModel(this.state.telefone,this.state.email,this.state.cpf);

        let retornoCadastrarCliente = await ClienteService.CadastrarCliente(cliente);

        Loading.close();    

        if (retornoCadastrarCliente.ok){
            
            this.props.history.push("/marcarCartao/"+this.state.telefone);

            // let mensagemModal = {
            //     texto: 'Cliente Cadastrado Com Sucesso!!!',
            //     tipo: TipoDeAlerta.SUCESS,
            //     eventos: [
            //         { 
            //             Nome: 'Fechar',
            //             onClick:(self)=>{     
                            
            //                 if (this.state.irParaTelaDeCartao){
            //                     this.props.history.push("/marcarCartao/"+this.state.telefone);
            //                 }                                                                         
            //             }                                
            //         }
            //     ]
            // };

            // this.props.handleModal(mensagemModal);


            //if (this.state.irParaTelaDeCartao){
            //this.props.history.push("/marcarCartao/"+this.state.telefone);
            //}       

        }else{
            const erro = await retornoCadastrarCliente.json();

            let mensagemModal = {
                texto: erro.Message,
                tipo: TipoDeAlerta.WARNING
            }
    
            this.props.handleModal(mensagemModal);            
        }  
            
    }

    handleTelefoneChange(event){
        this.setState({telefone: event.target.value});
    }

    handleCpfChange(event){
        this.setState({cpf: event.target.value});
    }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    render(){
        return <div className="w3-container" id="novoCliente" style={{ marginTop: '75px' }}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="w3-section">
                            <label>Telefone</label>
                            <MaskedInput mask="(11) 1 1111-1111" className="w3-input w3-border" type="text" name="Telefone" required value={this.state.telefone} onChange={this.handleTelefoneChange} />
                        </div>
                        <div className="w3-section">
                            <label>Cpf</label>
                            <MaskedInput mask="111.111.111-11" className="w3-input w3-border" type="text" name="Cpf" required value={this.state.cpf} onChange={this.handleCpfChange}/>
                        </div>
                        <div className="w3-section">
                            <label>E-mail</label>
                            <input className="w3-input w3-border" type="email" name="Email" required value={this.state.email} onChange={this.handleEmailChange}/>
                        </div>
                        <button type="submit" className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom">Salvar</button>                        
                    </form>                    
                </div>
    }

    componentDidMount(){
        
        let telefone = this.props.match.params.telefoneOuCpf;

        if (telefone)
        {
            this.setState({
                telefone: telefone,
                irParaTelaDeCartao:true
            });
        }
    }
}

export default CadastrarCliente;