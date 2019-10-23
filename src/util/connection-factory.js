const stores = [
  {
    nome: "clientes",
    indices: [],
    key:'TelefoneDesformatado'
  }
];
let connection = null;
let close = null;

const ConnectionFactory = (() => {
  return class ConnectionFactory {
    constructor() {
      throw new Error("Não é possível criar instâncias dessa classe");
    }

    static getConnection() {
      return new Promise((resolve, reject) => {
        if (connection) return resolve(connection);

        const openRequest = indexedDB.open("indexMaisFidelidade", 11);

        openRequest.onupgradeneeded = e => {
          ConnectionFactory._createStores(e.target.result);
        };

        openRequest.onsuccess = e => {
          connection = e.target.result;

          close = connection.close.bind(connection);

          connection.close = () => {
            throw new Error("Você não pode fechar diretamente a conexão");
          };

          resolve(e.target.result);
        };

        openRequest.onerror = e => {
          console.log(e.target.error);
          reject(e.target.error.name);
        };
      });
    }

    static _createStores(connection) {
      stores.forEach(store => {
        if (connection.objectStoreNames.contains(store.nome))
          connection.deleteObjectStore(store.nome);

        let objectStore;  
        if (store.key){
          objectStore = connection.createObjectStore(store.nome, {keyPath: store.key});
        }else{
           objectStore = connection.createObjectStore(store.nome, {
            autoIncrement: true
          });
        }

        store.indices.forEach(indice => {
          objectStore.createIndex("Telefone", "TelefoneDesformatado", { unique: false });
        });
      });
    }

    static closeConnection() {
      if (connection) {
        close();
      }
    }
  };
})();

export { ConnectionFactory };
