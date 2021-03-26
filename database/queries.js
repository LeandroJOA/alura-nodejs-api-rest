const connection = require('./connection')

// Executa queries e recebe o comando SQL e parametros (vazios caso não existentes)
const executeQuery = (sql, param = '') => {
    // Retorna uma nova Promise
    return new Promise((resolve, reject) => {
        connection.query(sql, param, (error, results, field) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}