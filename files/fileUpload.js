// Importanto biblioteca FileSystem
const fs = require('fs')

// Criando uma Stream de leitura do arquivo "test.jpg"
fs.createReadStream('./assets/test.jpg')
    // Em seguida, criando uma Stream de escrita deste arquivo, agora com o nome "testStream.jpg"
    .pipe(fs.createWriteStream('./assets/testStream.jpg'))
    // Ao finalizar, é executado uma função de callback, com feedback de sucesso
    .on('finish', () => console.log('Imagem foi escrita com sucesso'))