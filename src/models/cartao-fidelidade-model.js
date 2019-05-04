import { GuidHelper } from "../helpers/guid-helper";

class CartaoFidelidadeModel {

    Id;
    Cliente;
    Modelo;
    Ocorrencias;
    CriadoEm;
    Emissor;
    Numero;
    Status;

    constructor(cliente,emissor,ocorrencias,numero, status){
        
        this.Cliente = cliente;
        this.Modelo = emissor.ModeloCartaoFidelidade;
        this.Ocorrencias = ocorrencias;
        this.Id = GuidHelper.NewGuid();
        this.CriadoEm = new Date();
        this.Emissor = emissor;        
        this.Numero = numero;
        this.Status = status; 
    }    
}

export {CartaoFidelidadeModel}