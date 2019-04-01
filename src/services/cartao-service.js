

class  CartaoService{
    

    static CadastrarCartao(cartao){


        let cartaoStorage = localStorage.getItem("cartoes")
        let cartoes = [];
        
        if (!cartaoStorage){            
            cartoes.push(cartao);            
        }else{
            cartoes = JSON.parse(localStorage.getItem("cartoes"));
            cartoes.push(cartao);        
        }

        localStorage.setItem("cartoes",JSON.stringify(cartoes));

        return new Promise(resolve=>{
                setTimeout(() => {
                resolve(cartao);
            }, 2000);
             
         });
         
    }       

    static ObterCartoes(textoParaPesquisa){
        
        let cartoes = [];
        let cartoesEncontrados = [];

        let cartaoStorage = localStorage.getItem("cartoes");
        if (cartaoStorage){
            cartoes = JSON.parse(cartaoStorage);
        }                    

        if (cartoes.length > 0){                                     
            cartoesEncontrados = cartoes.filter((cartao)=>{
                return cartao.Nome.indexOf(textoParaPesquisa) !== -1;   
            });
        }        

        return new Promise(resolve=>{
           setTimeout(() => {            

            if (textoParaPesquisa){
                resolve(cartoesEncontrados);
            }else{
                resolve(cartoes)   
            }
            
           }, 2000);
            
        });

    }

}

export {CartaoService};