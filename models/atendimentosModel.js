const connection = require('../database/connection')

// Classe para inserção de dados em atendimentos
class AtendimentosModel {
    save(atendimento) {
        // Comando SQL
        const sql = 'INSERT INTO atendimentos SET ?'

        // Query INSERT
        connection.query(sql, atendimento, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
            }
        })
    }
}

// Exportando a classe "AtendimentosModel" já instanciada
module.exports = new AtendimentosModel