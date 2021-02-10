// Importa o conteudo de "Express"
const express = require('express')

// Inicialização
const app = express()

// Sobe a aplicação na porta 3000, e envia a mensagem abaixo no console
app.listen(3000, () => console.log('Servidor rodando na porta 3000'))

// Rota GET (localhost:3000/atendimentos), retornando com resultado a mensagem abaixo 
app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos!'))