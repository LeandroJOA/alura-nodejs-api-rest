const fs = require('fs')

fs.createReadStream('./assets/test.jpg')
    .pipe(fs.createWriteStream('./assets/testStream.jpg'))
    .on('finish', () => console.log('Imagem foi escrita com sucesso'))