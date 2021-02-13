const moment = require('moment')

const connection = require('../database/connection')

// Classe para manipulação de dados
class AtendimentosModel {
    // POST
    save(atendimento, res) {
        // Utilizando o moment para gerar uma nova data com os dados atuais
        const creationDate = moment().format('YYYY-MM-DD HH:MM:SS')
        // Utilizando o moment para formatar a data recebida, indicando o formato que é enviado
        const date = moment(atendimento.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        // Retorna true se a data recebida é igual o após a data de criação
        const dateValidator = moment(date).isSameOrAfter(creationDate)
        // Retorna true se o campo "client" possui mais de 1 caractere
        const clientValidator = atendimento.client.length > 1 

        // Arrya com todas as validações e suas mensagens 
        const validators = [
            // Campo date
            {
                nome: 'date',
                valid: dateValidator,
                message: 'ERROR! Data deve ser maior ou igual a data atual!'
            },
            // Campo client
            {
                nome: 'client',
                valid: clientValidator,
                message: 'ERROR! Nome do cliente deve ser maior que 1 caracterer!'
            }
        ]

        // Armazena o objeto em "errors", caso alguma validação possua "false" como "valid"
        const errors = validators.filter(field => !field.valid)
        // Verifica quantos erros existem (retorna false caso não exista nenhum)
        const hasErrors = errors.length

        // Verificando se exite algum erro
        if (hasErrors) {
            res.status(400).json(errors)
        } else {
            // Criando um atendimento atualizando, com tudo que já havia em atendimentos e adicionando a data de
            // criação e a data recebida
            const atendimentoDated = { ...atendimento, creationDate, date }

            // Comando SQL
            const sql = 'INSERT INTO atendimentos SET ?'

            // Realizando um query, inserindo todo o conteudo do objeto "atendimentoDated"
            connection.query(sql, atendimentoDated, (error, results) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(results)
                }
            })
        }
    }

    // GET
    findAll(res) {
        // Query SQL
        const sql = 'SELECT * FROM atendimentos'

        // Executando a query sql
        connection.query(sql, (error, results) => {
            // Tratamento de error
            if (error) {
                res.status(500).json(error)
            // Retorno    
            } else {
                res.status(200).json(results)
            }
        })
    }

    // GET
    findById(id, res) {
        // Query SQL
        const sql = `SELECT * FROM atendimentos WHERE ID = ${id}`

        // Executando a query
        connection.query(sql, (error, results) => {
            // Recebendo a primeira posição de "results"
            const atendimento = results[0]

            //Tratamento de erros
            if (error) {
                res.status(400).json(error)
            // Retorno     
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

}

// Exportando a classe "AtendimentosModel" já instanciada
module.exports = new AtendimentosModel