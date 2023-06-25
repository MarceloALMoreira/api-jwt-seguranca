const bodyParser = require('body-parser')

const produto = require('./produtoRoute')
const usuario = require('./usuarioRoute')
const auth = require('./authRoute')
const role = require('./role')
const permisao = require('./permissaoRoute')

module.exports = app => {
   app.use(
    bodyParser.json(),
    auth, // aqui eu vou garantir que minha routa auth seja publica!
    usuario,
    produto,
    role,
    permisao
   )
}
