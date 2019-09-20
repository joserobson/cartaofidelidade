
class UsuarioModel{

    Id;
    Nome;
    TipoDeComercio;
    ModeloCartaoFidelidade;
    PlanoDeAssociacao;
    Login;
    
    constructor(id, nome, tipoDeComercio, modeloCartaoFidelidade){
        this.Id = id;
        this.Nome = nome;
        this.TipoDeComercio = tipoDeComercio;
        this.ModeloCartaoFidelidade = modeloCartaoFidelidade;
        this.Login = '';
    }
}

export {UsuarioModel}