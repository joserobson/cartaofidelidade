import { GuidHelper } from "../helpers/guid-helper";

class ClienteModel{

    Id;
    Telefone;
    Email;
    Cpf;
    Nome;
    DiaAniversario;
    MesAniversario;

    constructor(telefone, email, nome, diaAniversario, mesAniversario, id){

        this.Telefone = telefone;
        this.Email = email;
        this.Nome = nome;
        this.Id = id;
        this.DiaAniversario = diaAniversario;
        this.MesAniversario = mesAniversario;
    }
    
}

export {ClienteModel};