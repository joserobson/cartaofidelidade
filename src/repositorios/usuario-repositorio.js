class UsuarioRepositorio {
  static CHAVE_USUARIO = "chave_usuario_mais_fidelidade";
  static CHAVE_MAIOR_DATA_CADASTRO = "chave_maior_data_cadastro";

  //   Id;
  //    Nome;
  //    TipoDeComercio;
  //    ModeloCartaoFidelidade;
  //    PlanoDeAssociacao;
  //    Login;

  static SalvarUsuario(usuario) {
    localStorage.setItem(this.CHAVE_USUARIO, JSON.stringify(usuario));
  }

  static ObterUsuario() {
    const jsonUsuario = localStorage.getItem(this.CHAVE_USUARIO);
    return JSON.parse(jsonUsuario);
  }

  static RemoverUsuario() {
    localStorage.removeItem(this.CHAVE_USUARIO);
  }

  static SalvarMaiorDataCadastroCliente(data){
    localStorage.setItem(this.CHAVE_MAIOR_DATA_CADASTRO, data);
  }

  static RemoverMaiorDataCadastroCliente() {
    localStorage.removeItem(this.CHAVE_MAIOR_DATA_CADASTRO);
  }

  static ObterMaiorDataDeCadastro() {
    return localStorage.getItem(this.CHAVE_MAIOR_DATA_CADASTRO);
  }

}

export { UsuarioRepositorio };
