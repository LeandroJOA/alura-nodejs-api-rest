const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

// Exporta esta configuração para que seja visivel em todo o codigo
module.exports = () => {

    // Inicialização
    const app = express()

    // Utilizando o BodyParser, se for o caso , converte o body recebido para URL Enconded
    app.use(bodyParser.urlencoded({ extended: true }))
    // Utilizando o BodyParser, se for o caso , converte o body recebido para Json
    app.use(bodyParser.json())

    // Executa o consign
    consign()
        // Identifica todos os arquivos presentes em "controllers"
        .include('controllers')
        // E os inclui na constante "app"
        .into(app)

    // Quando está função é executada, retorna o conteudo de app    
    return app
}
