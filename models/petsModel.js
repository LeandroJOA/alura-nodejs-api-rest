const connection = require('../database/connection')
const fileUpload = require('../files/fileUpload')

class PetsModel {
    // Metodo para salvar novos Pets
    save(pet, res) {
        // Query SQL
        const sql = 'INSERT INTO pets SET ?'

        fileUpload(pet.image, pet.name, (error, newPath) => {

            // Verifica se existem algum error
            if (error) {
                res.status(400).json({ error })
            } else {
                // Pet já salvo no banco
                const newPet = { name: pet.name, image: newPath }

                // Realizando um query e tratando possiveis erros
                connection.query(sql, newPet, error => {
                    if (error) {
                        console.log(error)
                        // Retorna o erro
                        res.status(400).json(error)
                    } else {
                        // Retorna o objeto adicionado ao banco
                        res.status(200).json(newPet)
                    }
                })
            }
        })
    }
}

module.exports = new PetsModel()