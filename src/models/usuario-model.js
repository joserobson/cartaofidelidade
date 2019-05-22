
class UsuarioModel{

    Id;
    Nome;
    TipoDeComercio;
    ModeloCartaoFidelidade;
    PlanoDeAssociacao;
    
    constructor(id, nome, tipoDeComercio, modeloCartaoFidelidade){
        this.Id = id;
        this.Nome = nome;
        this.TipoDeComercio = tipoDeComercio;
        this.ModeloCartaoFidelidade = modeloCartaoFidelidade;
    }
}

export {UsuarioModel}