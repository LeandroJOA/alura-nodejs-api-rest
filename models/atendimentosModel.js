const moment = require('moment')
const axios = require('axios')

const connection = require('../database/connection')
const repository = require('../repository/atendimentoRepository')

// Classe para manipulação de dados
class AtendimentosModel {
    // POST

    constructor() {

        // Retorna true se a data recebida é igual ou após a data de criação
        this.dateValidator = ({ date, creationDate }) => moment(date).isSameOrAfter(creationDate)
        // Retorna true se o campo "client" possui mais de 1 caractere
        this.clientValidator = (length) => length > 1

        this.validator = params => this.validators.filter(field => {
            const { name } = field
            const param = params[name]

            return !field.valid(param)
        })

        // Arrya com todas as validações e suas mensagens 
        this.validators = [
            // Campo date
            {
                nome: 'date',
                valid: this.dateValidator,
                message: 'ERROR! Data deve ser maior ou igual a data atual!'
            },
            // Campo client
            {
                nome: 'client',
                valid: this.clientValidator,
                message: 'ERROR! Nome do cliente deve ser maior que 1 caracterer!'
            }
        ]
        
    }
     
    save(atendimento) {
        // Utilizando o moment para gerar uma nova data com os dados atuais
        const creationDate = moment().format('YYYY-MM-DD HH:MM:SS')
        // Utilizando o moment para formatar a data recebida, indicando o formato que é enviado
        const date = moment(atendimento.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const params = {
            date: { date, creationDate },
            client: { length: atendimento.client.length }
        }

        console.log(params);

        // Armazena o objeto em "errors", caso alguma validação possua "false" como "valid"
        const errors = this.validator(params)
        // Verifica quantos erros existem (retorna false caso não exista nenhum)
        const hasErrors = errors.length

        // Verificando se exite algum erro
        if (hasErrors) {
            // Retorna um nova Promise com o reject e o error como parametro
            return new Promise((resolve, reject) => reject(error))
        } else {
            // Criando um atendimento atualizando, com tudo que já havia em atendimentos e adicionando a data de
            // criação e a data recebida
            const atendimentoDated = { ...atendimento, creationDate, date }

            // Caso a Promise seja bem sucedida, retorna um objeto com o conteudo de atendimento e seu id
            return repository.save(atendimentoDated)
                .then( results => {
                    const id = results.id
                    return { ...atendimento, id }
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