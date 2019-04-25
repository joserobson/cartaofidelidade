import { GuidHelper } from "../helpers/guid-helper";

class CartaoFidelidadeModel {

    Id;
    Cliente;
    Modelo;
    Ocorrencias;
    CriadoEm;
    Emissor;

    constructor(cliente,emissor,ocorrencias){
        

        this.Cliente = cliente;
        this.Modelo = emissor.ModeloCartaoFidelidade;
        this.Ocorrencias = ocorrencias;
        this.Id = GuidHelper.NewGuid();
        this.CriadoEm = new Date();
        this.Emissor = emissor;
    }    
}

export {CartaoFidelidadeModel}