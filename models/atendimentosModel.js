const moment = require('moment')
const axios = require('axios')

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

        console.log(creationDate);
        console.log(date);

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
                    res.status(201).json(atendimento)
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
        connection.query(sql, async (error, results) => {
            // Recebendo a primeira posição de "results"
            const atendimento = results[0]

            const cpf = atendimento.client

            //Tratamento de erros
            if (error) {
                res.status(400).json(error)
            // Retorno     
            } else {
                // Recebe os dados do cliente referente ao seu CPF
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                // Inclui esses dados ao atendimento
                atendimento.client = data

                res.status(200).json(atendimento)
            }
        })
    }

    // PATCH
    update(id, values, res) {
        // Verificando se foi enviado algum valor date
        if (values.date) {
            // Utilizando o moment para formatar a data recebida, indicando o formato que é enviado
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        // Query SQL
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        // Executando a query
        connection.query(sql, [values, id], (error, results) => {
            // Tratamento de erro
            if (error) {
                res.status(400).json(error)
            // Resposta    
            } else {
                res.status(200).json({...values, id})
            }
        })
    }

    // Delete
    delete(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?'

        connection.query(sql, id, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

// Exportando a classe "AtendimentosModel" já instanciada
module.exports = new AtendimentosModel