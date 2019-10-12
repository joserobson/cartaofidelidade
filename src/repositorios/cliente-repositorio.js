import { ClienteModel } from "../models/cliente-model";

class ClienteRepositorio {

    constructor(connection) {

        this._connection = connection;
        this._store = 'clientes';
    }


    adiciona(cliente) {

        return new Promise((resolve, reject) => {

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

            const indexTelefone = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .index("Telefone");


            var telefoneBoundKeyRange = IDBKeyRange.only(telefone);

            const cursor = indexTelefone
                .openCursor(telefoneBoundKeyRange);

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
                reject('Não foi possível buscar o client pelo telefone');
            }

        });
    }

}

export {ClienteRepositorio}