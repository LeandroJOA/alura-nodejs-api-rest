// Importa o conteudo da config "customExmpress"
const customExpress = require('./config/customExpress')
const connection = require('./database/connection')
const tables = require('./database/tables')

connection.connect(error => {
    // Caso ocorra algum erro
    if (error) {
        console.log(error)
    // Caso a query seja bem sucedida    
    } else {
        // Mensagem de sucesso
        console.log('Conexão com o banco de dados realizada com sucesso!');

        // Chama o metodo de inicialização, enviando a conexão 
        tables.init(connection)

        // Executa a função da customExpress, e armazena o retorno em app
        const app = customExpress()

        // Sobe a aplicação na porta 3000, e envia a mensagem abaixo no console
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})