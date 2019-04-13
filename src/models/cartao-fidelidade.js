import { GuidHelper } from "../helpers/guid-helper";

class CartaoFidelidadeModel {

    Id;
    Cliente;
    Modelo;
    Ocorrencias;
    CriadoEm;

    constructor(cliente, modelo, ocorrencias){

        this.Cliente = cliente;
        this.Modelo = modelo;
        this.Ocorrencias = ocorrencias;
        this.Id = GuidHelper.NewGuid();
        this.CriadoEm = new Date();
    }

    // constructor(cliente, modelo, ocorrencias, criadoEm, id){
    //     this.Cliente = cliente;
    //     this.Modelo = modelo;
    //     this.Ocorrencias = ocorrencias;
    //     this.CriadoEm = criadoEm;
    //     this.Id = id;
    // }
}

export {CartaoFidelidadeModel}