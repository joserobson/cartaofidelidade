
export class RetornoService{

    Sucesso;
    Dados;
    Erro;

    constructor(sucesso, dados, erro){
        this.Sucesso = sucesso;
        this.Dados = dados;
        this.Erro = erro;
    }

}