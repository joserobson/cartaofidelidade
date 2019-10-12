import { ClienteRepositorio } from "../repositorios/cliente-repositorio"
import { ConnectionFactory } from "./connection-factory";

class RepositorioFactory{

    static getClienteRepositorio(){
        
        return ConnectionFactory
        .getConnection()
        .then(conn=> new ClienteRepositorio(conn));
    }
}

export{RepositorioFactory}