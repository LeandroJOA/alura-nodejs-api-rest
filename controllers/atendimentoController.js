// Exporta estas rotas, para que sejam visiveis em todo o codigo
module.exports = app => {

    // Rota GET (localhost:3000/atendimentos), retornando com resultado a mensagem abaixo 
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos!'))

    // Rota POST (localhost:3000/atendimentos)
    app.post('/atendimentos', (req, res) => { 
        console.log(req.body)
        res.send('Você está na rota de atendimentos e está realizando um POST')
    })
}