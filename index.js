// Importa o conteudo da config "customExmpress"
const customExpress = require('./config/customExpress')
const connection = require('./database/connection')

connection.connect(error => {
    if (error) {
        console.log(error)
    } else {
        console.log('Conexão com o banco de dados realizada com sucesso!');

        // Executa a função da customExpress, e armazena o retorno em app
        const app = customExpress()

        // Sobe a aplicação na porta 3000, e envia a mensagem abaixo no console
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})