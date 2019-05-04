import { ClienteModel } from "../models/cliente-model";
import { UsuarioModel } from "../models/usuario-model";
import { TipoDeComercio } from "../enums/tipo-comercio";
import { ModeloCartaoFidelidadeModel } from "../models/modelo-cartao-model";
import { CartaoFidelidadeModel } from "../models/cartao-fidelidade-model";
import { DateHelper } from "./date-helper";
import { StatusDoCartao } from "../enums/status-cartao";

class MockDadosHelper{


    static STORAGE_NAME_USUARIOS = "usuarios";
    static STORAGE_NAME_CLIENTES = "clientes";
    static STORAGE_NAME_CARTOES = "cartoes";

    constructor(){

    }

    static carregarDadosDeTeste(){

        this.criarUsuarios();
        this.criarClientes();
        this.criarCartoesFidelidade();
    }

    static ZerarDados(){

        //localStorage.clear();

        let jaZerei = localStorage.getItem("jaZerei");
        if (!jaZerei)
        {
            localStorage.clear();
            localStorage.setItem("jaZerei","ok");
        }
    }


    //criar uma lista de clientes para compartilhar com os usuarios
    //popular a storage clientes
    static criarClientes(){

        let clientes = [
            new ClienteModel("(42) 93496-3759","Aenean@vitaeorci.ca","1644122086999"),
            new ClienteModel("(98) 98906-6658","justo@condimentumDonec.net","1603083071599"),
            new ClienteModel("(41) 97831-7141","dolor.Fusce.mi@eunequepellentesque.edu","1607030669399"),
            new ClienteModel("(27) 98770-7701","sagittis.semper.Nam@eu.ca","1672072664899"),
            new ClienteModel("(74) 91716-2154","vehicula.risus@sagittis.edu","1638091983299"),
            new ClienteModel("(22) 99305-1517","Morbi@natoquepenatibus.ca","1638083042699"),
            new ClienteModel("(55) 90014-3594","et.magnis@afelisullamcorper.org","1647091795099"),
            new ClienteModel("(59) 94946-2981","iaculis.lacus.pede@quis.ca","1638080545799"),
            new ClienteModel("(57) 91452-7125","tellus@lorem.co.uk","1668092637799"),
        ]

        let clienteStorage = localStorage.getItem(this.STORAGE_NAME_CLIENTES);
        if (!clienteStorage){
            localStorage.setItem(this.STORAGE_NAME_CLIENTES,JSON.stringify(clientes));
        }        
    }


    static criarUsuarios(){

        let usuarios = [
            new UsuarioModel("1","Prosa & Café", TipoDeComercio.CAFETERIA,
                 new ModeloCartaoFidelidadeModel("Prosa & Café","Vale no valor de R$ 10,00",10)),
            new UsuarioModel("2","Ponto do Açai", TipoDeComercio.SORVETERIA,
                new ModeloCartaoFidelidadeModel("Ponto do Açai","Ganhe um açai",12)),
            new UsuarioModel("3","Barbearia Império", TipoDeComercio.BARBEARIA,
                new ModeloCartaoFidelidadeModel("Barbearia Império","Ganhe um corte de cabelo",8)),
        ]

        let usuarioStorage = localStorage.getItem(this.STORAGE_NAME_USUARIOS);
        if (!usuarioStorage){
            localStorage.setItem(this.STORAGE_NAME_USUARIOS,JSON.stringify(usuarios));
        } 
    }

    static criarCartoesFidelidade(){


        let cartoes = [
            new CartaoFidelidadeModel(this.ObterCliente(0), this.ObterEmissor(0),this.GerarListaDeOcorrencias(3),1, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(1), this.ObterEmissor(0),this.GerarListaDeOcorrencias(2),2, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(2), this.ObterEmissor(0),this.GerarListaDeOcorrencias(1),3, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(3), this.ObterEmissor(0),this.GerarListaDeOcorrencias(9),4, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(4), this.ObterEmissor(0),this.GerarListaDeOcorrencias(9),1, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(5), this.ObterEmissor(0),this.GerarListaDeOcorrencias(3),4, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(0), this.ObterEmissor(1),this.GerarListaDeOcorrencias(3),6, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(1), this.ObterEmissor(1),this.GerarListaDeOcorrencias(2),1, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(2), this.ObterEmissor(1),this.GerarListaDeOcorrencias(9),3, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(3), this.ObterEmissor(1),this.GerarListaDeOcorrencias(8),4, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(4), this.ObterEmissor(1),this.GerarListaDeOcorrencias(11),5, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(5), this.ObterEmissor(1),this.GerarListaDeOcorrencias(11),1, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(0), this.ObterEmissor(2),this.GerarListaDeOcorrencias(3),1, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(1), this.ObterEmissor(2),this.GerarListaDeOcorrencias(4),5, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(2), this.ObterEmissor(2),this.GerarListaDeOcorrencias(5),6, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(3), this.ObterEmissor(2),this.GerarListaDeOcorrencias(6),3, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(4), this.ObterEmissor(2),this.GerarListaDeOcorrencias(5),1, StatusDoCartao.ABERTO),
            new CartaoFidelidadeModel(this.ObterCliente(5), this.ObterEmissor(2),this.GerarListaDeOcorrencias(2),1, StatusDoCartao.ABERTO),
        ]

        let cartaoStorage = localStorage.getItem(this.STORAGE_NAME_CARTOES);
        if (!cartaoStorage){
            localStorage.setItem(this.STORAGE_NAME_CARTOES,JSON.stringify(cartoes));
        } 
    }

    static ObterCliente(indice){

        let clienteStorage = localStorage.getItem(this.STORAGE_NAME_CLIENTES);
        let clientes = JSON.parse(clienteStorage);

        return clientes[indice];
    }

    static ObterEmissor(indice){        

        let usuarioStorage = localStorage.getItem(this.STORAGE_NAME_USUARIOS);
        let dados = JSON.parse(usuarioStorage);

        return dados[indice];
    }

    static GerarListaDeOcorrencias(numOcorrencias){

        let ocorrencias = [];

        for (let index = 0; index < numOcorrencias; index++) {            
            let novoData = this.randomDate(1,31,0,23);
            ocorrencias.push(DateHelper.formatarData(novoData));
        }

        return ocorrencias;
    }

    static randomDate(start, end, startHour, endHour) {
        var date = new Date(+start + Math.random() * (end - start));
        var hour = startHour + Math.random() * (endHour - startHour) | 0;
        date.setHours(hour);
        return date;
      }

}

export {MockDadosHelper}
