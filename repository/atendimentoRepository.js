const query = require('../database/queries')

class AtendimentoRepository {

    save(atendimento) {
        // Comando SQL
        const sql = 'INSERT INTO atendimentos SET ?'
        
        // Retorna o resulta da Promise 
        return query(sql, atendimento)
    }
}

module.exports = new AtendimentoRepository