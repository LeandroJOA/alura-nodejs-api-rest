class Tables {
    // Metodo de inicialização
    init(connection) {
        this.connection = connection

        this.createAtendimentos()
    }

    createAtendimentos() {
        // Comando SQL
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

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
}

// Exporta a classe "Tables" já instanciada
module.exports = new Tables