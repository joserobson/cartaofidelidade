import { GuidHelper } from "../helpers/guid-helper";

class ClienteModel{

    Id;
    Telefone;
    Email;
    Cpf;

    constructor(telefone, email, cpf){

        this.Telefone = telefone;
        this.Email = email;
        this.Cpf = cpf;
        this.Id = null;
    }
    
}

export {ClienteModel};