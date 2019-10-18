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

    isValid(){
      
    
        if (!this.Telefone | this.Telefone === ''){
            throw new Error('Forneça o número do telefone.')
        }

        var regexTelefoneValido = /^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/
        if (!regexTelefoneValido.test(this.TelefoneSemMascara())){
            throw new Error('Telefone Inválido! Confira os números do telefone.')
        }

        return true;
    }

    TelefoneSemMascara(){
        return this.Telefone.replace(/\D/g, "");
    }
    
    static RemoverMascaraTelefone(telefone){
        return telefone.replace(/\D/g, "");
    }
}

export {ClienteModel};