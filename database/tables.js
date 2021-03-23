const { query } = require("express")

class Tables {
    // Metodo de inicialização
    init(connection) {
        this.connection = connection

        this.createAtendimentos()
        this.createPets()
    }

    // Cria tabela Atendimentos
    createAtendimentos() {
        // Comando SQL
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, date datetime NOT NULL, creationDate datetime NOT NULL, status varchar(20) NOT NULL, observation text, PRIMARY KEY(id))'

        // Realizando uma query com o comando SQL definido anteriormente
        this.connection.query(sql, error => {
            // Caso a query falhe
            if (error) {
                console.log(error)
            // Caso a query tenha sucesso    
            } else {
                console.log('Tabela Atendimentos criada com sucesso!')
            }
        })
    }

    // Cria tabela Pets
    createPets() {
        // Query SQL
        const sql = 
            'CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, image varchar(200), PRIMARY KEY (id))'

        // Executando query SQL e tratando erros
        this.connection.query(sql, error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Tabela Pets criada com sucesso!')
            }
        })
    }
}

// Exporta a classe "Tables" já instanciada
module.exports = new Tables