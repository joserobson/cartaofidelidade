
import React, {Component} from "react";
import {ModeloCartaoFidelidadeModel} from "../../models/modelo-cartao-model";
import {CartaoService} from "../../services/cartao-service";
import Loading from "../loading/loading";
import TipoDeAlerta from "../modal/tipo-alerta";

class CadastrarModeloCartao extends Component{    

    constructor(props){
        super(props);

        this.state = {
            nome: "",
            beneficio: "",
            qtdMarcacoes: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event){

        Loading.show();

        let cartao = new ModeloCartaoFidelidadeModel(this.state.nome, this.state.beneficio, this.state.qtdMarcacoes);

        let retornoCadastrarCartao = CartaoService.CadastrarCartao(cartao);

        retornoCadastrarCartao.then(()=>{
            Loading.close();                        
            
            let mensagemModal = {
                texto: 'Modelo de Cartão Cadastrado Com Sucesso!!!',
                tipo: TipoDeAlerta.SUCESS
            }
    
            this.props.handleModal(mensagemModal);

        },()=>{
            Loading.close();            

            let mensagemModal = {
                texto: 'Erro ao cadastrar Modelo de cartão',
                tipo: TipoDeAlerta.WARNING
            }
    
            this.props.handleModal(mensagemModal);
        });        

        
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
                
        this.setState({
            [name]: value 
        });
      }

    render(){
        return <div className="w3-container" id="novoCliente" style={{ marginTop: '75px' }}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="w3-section">
                            <label>Nome</label>
                            <input className="w3-input w3-border" type="text" name="nome" value={this.state.nome} onChange={this.handleInputChange} required />
                        </div>
                        <div className="w3-section">
                            <label>Benefício</label>
                            <input className="w3-input w3-border" type="text" name="beneficio" value={this.state.beneficio} onChange={this.handleInputChange} required />
                        </div>
                        <div className="w3-section">
                            <label>Qtd Marcações</label>
                            <input className="w3-input w3-border" type="number" name="qtdMarcacoes" value={this.state.qtdMarcacoes} onChange={this.handleInputChange} required />
                        </div>
                        <button type="submit" className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom">Salvar</button>
                    </form>
                </div>
    }
}

export default CadastrarModeloCartao;