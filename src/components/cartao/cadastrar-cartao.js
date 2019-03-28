
import React, {Component} from "react";

class CadastrarCartao extends Component{    

    render(){
        return <div className="w3-container" id="novoCliente" style={{ marginTop: '75px' }}>
                    <form>
                        <div className="w3-section">
                            <label>Nome</label>
                            <input className="w3-input w3-border" type="text" name="NomeCartao" required />
                        </div>
                        <div className="w3-section">
                            <label>Benefício</label>
                            <input className="w3-input w3-border" type="text" name="Beneficio" required />
                        </div>
                        <div className="w3-section">
                            <label>Qtd Marcações</label>
                            <input className="w3-input w3-border" type="text" name="QtdMarcacoes" required />
                        </div>
                        <button type="submit" className="w3-button w3-block w3-padding-large w3-blue w3-margin-bottom">Salvar</button>
                    </form>
                </div>
    }
}

export default CadastrarCartao;