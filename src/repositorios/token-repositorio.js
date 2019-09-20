class TokenRepositorio {
  
  static CHAVE_TOKEN = "chave_token_mais_fidelidade";
  
  //Id;
  //DataExpiracao;
  static ObterToken(){        
    const jsonToken = localStorage.getItem(this.CHAVE_TOKEN);
    return JSON.parse(jsonToken);
  }

  static SalvarToken(token){        
    const jsonToken = JSON.stringify(token)
    localStorage.setItem(this.CHAVE_TOKEN, jsonToken);
  }

  static RemoverToken(){            
    localStorage.removeItem(this.CHAVE_TOKEN);
  }

}

export { TokenRepositorio };
