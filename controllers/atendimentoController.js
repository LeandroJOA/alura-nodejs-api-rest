const atendimentosModel = require('../models/atendimentosModel')

// Exporta estas rotas, para que sejam visiveis em todo o codigo
module.exports = app => {

    // Rota GET (localhost:3000/atendimentos)
    app.get('/atendimentos', (req, res) => {
        // Chamada do metodo da model para listar todos os dados
        atendimentosModel.findAll(res)
    })

    // Rota GET (localhost:3000/{id})
    app.get('/atendimentos/:id', (req, res) => {
        // Convertendo o id recebido para inteiro
        const id = parseInt(req.params.id)

        // Chamando o metodo da model para listar um unico dado
        atendimentosModel.findById(id, res)
    })

    // Rota POST (localhost:3000/atendimentos)
    app.post('/atendimentos', (req, res) => { 
        // Armazenando o body enviado da requisição realizada
        const atendimento = req.body

        atendimentosModel.save(atendimento)
            // Caso o metodo save seja bem sucedido, retorna como response o codigo 201 e o atendimento que foi cadastrado
            .then(registeredAtendimento => res.status(201).json(registeredAtendimento))
            // Caso contrario retorna o status 400, junto do objeto com o erro
            .catch(error => res.status(400).json(error))
    })

    // Rota PATCH (localhost:3000/atendimentos/{id})
    app.patch('/atendimentos/:id', (req, res) => {
        // Converte para inteiro o id recebido
        const id = parseInt(req.params.id)
        // Captura o body enviado pela requisição
        const values = req.body

        // Chama o metodo para atualizar um dado especifico
        atendimentosModel.update(id, values, res)
    })

   // Rota DELETE (localhost:3000/atendimentos/{id}) 
    app.delete('/atendimentos/:id', (req, res) => {
        // Converte para inteiro o id recebido
        const id = parseInt(req.params.id)

        // Chama o metodo da model para deletar um atendimento especifico     
        atendimentosModel.delete(id, res)
    })
}