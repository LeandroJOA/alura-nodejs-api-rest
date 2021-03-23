const PetsModel = require('../models/petsModel')

module.exports = app => {

    // Requisição POST
    app.post('/pets', (req, res) => {
        // Recebe o body da requisição
        const pet = req.body

        // Chama o metodo save, passando o pet recebido junto da response
        PetsModel.save(pet, res)
    })
}