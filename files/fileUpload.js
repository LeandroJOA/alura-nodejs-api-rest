// Importanto biblioteca FileSystem
const fs = require('fs')
const pathExt = require('path')

module.exports = (path, filename, callbackCreatedImage) => {
    // Metodo assincrono

    // Extensões que serão aceitas
    const validExt = ['jpg', 'png', 'jpeg']

    // Capturando a extensão da imagem a ser armazenada
    const ext = pathExt.extname(path)
    
    // Verificando se a extensão da imagem recebida esta dentro do array de tipos validos (-1 caso não)
    // substring - Ignora a primeira posição de ext (no caso o ".")
    const extIsValid = validExt.indexOf(ext.substring(1))

    // Verifica se o tipo é valido
    if (extIsValid !== -1) {
        // Caminho onde a imagem a irá ser salva
        const newPath = `./assets/savedImages/${filename}${ext}`

        // Criando uma Stream de leitura da imagem
        fs.createReadStream(path)
            // Em seguida, criando uma Stream de escrita deste arquivo
            .pipe(fs.createWriteStream(newPath))
            // Ao finalizar, é executado uma função de callback
            .on('finish', () => callbackCreatedImage(newPath))
    } else {
        console.log("Error! Tipo invalido");
    }
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