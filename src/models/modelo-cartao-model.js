import { GuidHelper } from "../helpers/guid-helper";

class ModeloCartaoFidelidadeModel{

    Id;
    Nome;
    Beneficio;
    QtdMarcacoes;
    Ativo;

    constructor(nome, beneficio, qtd){

        this.Nome = nome;
        this.Beneficio = beneficio;
        this.QtdMarcacoes = qtd;
        this.Id = GuidHelper.NewGuid();
        this.Ativo = false;
    }    
}

export {ModeloCartaoFidelidadeModel};