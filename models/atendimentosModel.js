const moment = require('moment')

const connection = require('../database/connection')

// Classe para inserção de dados em atendimentos
class AtendimentosModel {
    save(atendimento) {
        // Utilizando o moment para gerar uma nova data com os dados atuais
        const creationDate = moment().format('YYYY-MM-DD HH:MM:SS')
        // Utilizando o moment para formatar a data recebida, indicando o formato que é enviado
        const date = moment(atendimento.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        // Criando um atendimento atualizando, com tudo que já havia em atendimentos e adicionando a data de
        // criação e a data recebida
        const atendimentoDated = {...atendimento, creationDate, date} 
        // Comando SQL
        const sql = 'INSERT INTO atendimentos SET ?'

        // Realizando um query, inserindo todo o conteudo do objeto "atendimentoDated"
        connection.query(sql, atendimentoDated, (error, results) => {
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