import { ClienteModel } from "../models/cliente-model";

class ClienteRepositorio {

    constructor(connection) {

        this._connection = connection;
        this._store = 'clientes';
    }

     salvar(cliente){

        const index = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .index('Telefone');

        var request = index.get(cliente.TelefoneSemMascara());

        request.onsuccess = e => {
            
            console.log('sucesso:', e.target.result);
            let result = e.target.result;
            result.Nome = cliente.Nome;
            this.atualiza(result);
        };

        request.onerror = e => {
            console.log('Erro ao salvar:', e.target.error);
            //reject('Não foi possível salvar o cliente');
        }
        
    }

    adiciona(cliente) {

        return new Promise((resolve, reject) => {

            cliente.TelefoneDesformatado = cliente.TelefoneSemMascara();

            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(cliente);

            request.onsuccess = e => resolve();
            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível salvar o cliente');
            }
        });
    }

    atualiza(cliente) {

        return new Promise((resolve, reject) => {

            cliente.TelefoneDesformatado = cliente.TelefoneSemMascara();
            
            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .put(cliente);

            request.onsuccess = e => resolve();
            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível salvar o cliente');
            }
        });
    }
    listaTodos() {

        return new Promise((resolve, reject) => {

            const clientes = [];

            const cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            cursor.onsuccess = e => {

                const atual = e.target.result;

                if (atual) {

                    const cliente = new ClienteModel(
                        atual.value.Telefone,
                        atual.value.Email,
                        atual.value.Nome,
                        atual.value.DiaAniversario,
                        atual.value.MesAniversario,
                        atual.value.Id);

                    clientes.push(cliente);
                    atual.continue();

                } else {

                    resolve(clientes);
                }
            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar os clientes');
            }

        });
    }

    apagaTodos() {

        return new Promise((resolve, reject) => {

            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve();

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar os clientes');                
            };

        });
    }
    
    obterPorTelefone(telefone){
        return new Promise((resolve, reject) => {

            const clientes = [];

            const cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            cursor.onsuccess = e => {

                
                const atual = e.target.result;

                if (atual) {

                    if (atual.value.TelefoneDesformatado.includes(telefone))
                    {
                        const cliente = new ClienteModel(
                            atual.value.Telefone,
                            atual.value.Email,
                            atual.value.Nome,
                            atual.value.DiaAniversario,
                            atual.value.MesAniversario,
                            atual.value.Id);

                        clientes.push(cliente);                        
                    }

                    atual.continue();
                }

                else {

                    resolve(clientes);
                }
            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar os clientes');
            }

        });
    }

    async adicionaNovosClientes(clientes) {
        
        clientes.forEach(async cliente => {
            
            const telefone = ClienteModel.RemoverMascaraTelefone(cliente.Telefone);
            var clientesEncontrados = await this.obterPorTelefone(telefone);
            if (clientesEncontrados.length === 0){
                await this.adiciona(cliente);
            }        
        });               
    }

}

export {ClienteRepositorio}