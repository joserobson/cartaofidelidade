import { GuidHelper } from "../helpers/guid-helper";

class ModeloCartaoFidelidadeModel{

    Id;
    Nome;
    Beneficio;
    QtdMarcacoes;

    constructor(nome, beneficio, qtd){

        this.Nome = nome;
        this.Beneficio = beneficio;
        this.QtdMarcacoes = qtd;
        this.Id = GuidHelper.NewGuid();
    }    
}

export {ModeloCartaoFidelidadeModel};