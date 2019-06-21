import { GuidHelper } from "../helpers/guid-helper";

class ClienteModel{

    Id;
    Telefone;
    Email;
    Cpf;
    Nome;
    DiaAniversario;
    MesAniversario;

    constructor(telefone, email, nome){

        this.Telefone = telefone;
        this.Email = email;
        this.Nome = nome;
        this.Id = null;
    }
    
}

export {ClienteModel};