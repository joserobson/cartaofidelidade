class UsuarioRepositorio {
  static CHAVE_USUARIO = "chave_usuario_mais_fidelidade";

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
}

export { UsuarioRepositorio };
