const TipoDeComercio = {

    CAFETERIA:{
        ID: 1,
        ICONE: "icone-cafe-2.png",
        COR:""
    },

    SORVETERIA:{
        ID: 2,
        ICONE:"icone-sorvete-48.png",
        COR:""
    },

    BARBEARIA:{
        ID:3,
        ICONE:"icone-cafe-2.png",
        COR:""
    },

    ObterTipoDeComercio(id){
        switch (id) {
            case this.CAFETERIA.ID:
                return this.CAFETERIA;
        
            case this.SORVETERIA.ID:
                return this.SORVETERIA;

            case this.BARBEARIA.ID:
                return this.BARBEARIA;
            default:
                return this.CAFETERIA;
        }
    }
}

export{TipoDeComercio}
