const connection = require('../database/connection')

class PetsModel {
    // Metodo para salvar novos Pets
    save(pet, res) {
        // Query SQL
        const sql = 'INSERT INTO pets SET ?'

        // Realizando um query e tratando possiveis erros
        connection.query(sql, pet, error => {
            if (error) {
                console.log(error)
                // Retorna o erro
                res.status(400).json(error)
            } else {
                // Retorna o objeto adicionado ao banco
                res.status(200).json(pet)
            }
        })
    }
}

module.exports = new PetsModel()