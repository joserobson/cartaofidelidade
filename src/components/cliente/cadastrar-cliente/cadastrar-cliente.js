
import React, {Component} from "react";
import { ClienteModel } from "../../../models/cliente-model";
import { ClienteService } from "../../../services/cliente-service";
import Loading from "../../loading/loading"; 
import MaskedInput from "react-maskedinput";
import {NotificationManager} from 'react-notifications';

class CadastrarCliente extends Component{    

    constructor(props){
        super(props);

        this.state = {
            id: null,
            telefone: '',
            nome: '',
            email:'',
            dias:[],
            meses:[
                {Id:1,Mes:'Janeiro'},
                {Id:2,Mes:'Fevereiro'},
                {Id:3,Mes:'Março'},
                {Id:4,Mes:'Abril'},
                {Id:5,Mes:'Maio'},
                {Id:6,Mes:'Junho'},
                {Id:7,Mes:'Julho'},
                {Id:8,Mes:'Agosto'},
                {Id:9,Mes:'Setembro'},
                {Id:10,Mes:'Outubro'},
                {Id:11,Mes:'Novembro'},
                {Id:12,Mes:'Dezembro'}
            ],
            diaSelecionado: 0,
            mesSelecionado: 0,
            modoEdicao: false            
        }
        
        this.handleTelefoneChange = this.handleTelefoneChange.bind(this);
        this.handleCpfChange = this.handleCpfChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);        
        this.handleNomeChange = this.handleNomeChange.bind(this);
        this.handleChangeDia = this.handleChangeDia.bind(this);
        this.handleChangeMes = this.handleChangeMes.bind(this);

        let dias = [];
        for (let index = 1; index <= 31; index++) {
            dias.push(index);  
        } 
        this.state.dias = dias;
        
        if (props.clienteParaEdicao){ 
            
            console.log("Editar cliente=>", props.clienteParaEdicao);
            
            this.state.telefone = props.clienteParaEdicao.Telefone;
            this.state.email = props.clienteParaEdicao.Email;
            this.state.nome = props.clienteParaEdicao.Nome;
            this.state.diaSelecionado = props.clienteParaEdicao.DiaAniversario;
            this.state.mesSelecionado = props.clienteParaEdicao.MesAniversario;        
            this.state.modoEdicao = true;
            this.state.id = props.clienteParaEdicao.Id;    
        }
    }  


     handleSubmit = async event =>{
        
        Loading.show();

        event.preventDefault();

        let cliente = new ClienteModel(
                                    this.state.telefone,
                                    this.state.email,
                                    this.state.nome,
                                    this.state.diaSelecionado,
                                    this.state.mesSelecionado,
                                    this.state.id
                                );

        let retornoCadastrarCliente = await ClienteService.CadastrarCliente(cliente);

        Loading.close();    

        if (retornoCadastrarCliente.ok){
            
            if (this.state.modoEdicao){
                NotificationManager.success('Cliente Atualizado Com Sucesso','',3000);                
            }else{
                NotificationManager.success('Cliente Cadastrado Com Sucesso','',3000);            
                this.props.history.push("/marcarCartao/"+this.state.telefone);
            }

        }else{
            const erro = await retornoCadastrarCliente.json();
            NotificationManager.warning(erro.Message,'',3000);
        }  
            
    }

    handleTelefoneChange(event){
        this.setState({telefone: event.target.value});
    }

    handleCpfChange(event){
        this.setState({cpf: event.target.value});
    }

    handleNomeChange(event){
        this.setState({nome: event.target.value});
    }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handleChangeDia(event)
    {
        this.setState({diaSelecionado:event.target.value});
    }

    handleChangeMes(event){
        this.setState({mesSelecionado: event.target.value});
    }

    render(){
        return <div className="" id="novoCliente">                    
                    
                    <form onSubmit={this.handleSubmit}>
                        <div className="w3-section">
                            <label>Telefone</label>
                            <MaskedInput mask="(11) 1 1111-1111" className="w3-input w3-border" 
                                type="text" name="Telefone" required value={this.state.telefone} 
                                onChange={this.handleTelefoneChange} disabled={this.state.modoEdicao}/>
                        </div>
                        <div className="w3-section">
                            <label>Nome</label>
                            <input className="w3-input w3-border" type="text" name="Nome" value={this.state.nome} onChange={this.handleNomeChange}/>
                        </div>
                        <div className="w3-section">
                            <label>E-mail</label>
                            <input className="w3-input w3-border" type="email" name="Email" value={this.state.email} onChange={this.handleEmailChange}/>
                        </div>
                        <div className="w3-section w3-cell-row">

                            <div className="w3-cell">
                                <label>Dia Aniversário</label>
                                <select className="w3-input w3-border" value={this.state.diaSelecionado} onChange={this.handleChangeDia}>
                                    {this.state.dias.map(dia =>(   
                                        <option key={dia} value={dia}>{dia}</option>    
                                    ))}
                                </select>
                            </div>
                            <div className="w3-cell">
                                <label>Mês Aniversário</label>
                                <select className="w3-input w3-border" value={this.state.mesSelecionado} onChange={this.handleChangeMes}>
                                    {this.state.meses.map(mes =>(   
                                        <option key={mes.Id} value={mes.Id}>{mes.Mes}</option>    
                                    ))}
                                </select>       
                            </div>
                            
                        </div>
                        <button type="submit" className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom">Salvar</button>                        
                    </form>                    
                </div>
    }

    componentDidMount(){
                    
    }
}

export default CadastrarCliente;