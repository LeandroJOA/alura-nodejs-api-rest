// Importanto biblioteca FileSystem
const fs = require('fs')

/*
// Metodo sincrono
// Lê o arquivo "test", chamando um callback com o erro e buffer do arquivo
fs.readFile('./assets/test.jpg', (error, buffer) => {
    console.log('Imagem bufferizada')

    // Escreve um novo arquivo com base no buffer do arquivo lido
    fs.writeFile('./assets/testStream.jpg'), buffer, error => {
        console.log('Imagem escrita')
    }
})
*/

// Metodo assincrono
// Criando uma Stream de leitura do arquivo "test.jpg"
fs.createReadStream('./assets/test.jpg')
    // Em seguida, criando uma Stream de escrita deste arquivo, agora com o nome "testStream.jpg"
    .pipe(fs.createWriteStream('./assets/testStream.jpg'))
    // Ao finalizar, é executado uma função de callback, com feedback de sucesso
    .on('finish', () => console.log('Imagem foi escrita com sucesso'))