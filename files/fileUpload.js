// Importanto biblioteca FileSystem
const fs = require('fs')

module.exports = (path, filename, callbackCreatedImage) => {
    // Metodo assincrono

    // Caminho onde a imagem a irá ser salva
    const newPath = `./assets/savedImages/${filename}`

    // Criando uma Stream de leitura da imagem
    fs.createReadStream(path)
        // Em seguida, criando uma Stream de escrita deste arquivo
        .pipe(fs.createWriteStream(newPath))
        // Ao finalizar, é executado uma função de callback
        .on('finish', () => callbackCreatedImage(newPath))
}

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