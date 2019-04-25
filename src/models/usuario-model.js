
class UsuarioModel{

    Id;
    Nome;
    TipoDeComercio;
    ModeloCartaoFidelidade;
    Login;
    Senha;

    constructor(id, nome, tipoDeComercio, modeloCartaoFidelidade){
        this.Id = id;
        this.Nome = nome;
        this.TipoDeComercio = tipoDeComercio;
        this.ModeloCartaoFidelidade = modeloCartaoFidelidade;
    }
}

export {UsuarioModel}