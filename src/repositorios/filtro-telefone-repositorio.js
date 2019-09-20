class FiltroTelefoneRepositorio {
  CHAVE_TELEFONE_BUSCA_CLIENTES = "telefoneParaPesquisa";

  static SalvarFiltroTelefone(telefone) {
    localStorage.setItem(this.CHAVE_TELEFONE_BUSCA_CLIENTES, telefone);
  }

  static ObterFiltroTelefone(){
      return localStorage.getItem(this.CHAVE_TELEFONE_BUSCA_CLIENTES);
  }

  static RemoverFiltroTelefone(){
      localStorage.removeItem(this.CHAVE_TELEFONE_BUSCA_CLIENTES);
  }
}

export { FiltroTelefoneRepositorio };
