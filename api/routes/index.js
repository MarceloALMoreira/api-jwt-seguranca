const bodyParser = require('body-parser')

const produto = require('./produtoRoute')
const usuario = require('./usuarioRoute')
const auth = require('./authRoute')
const role = require('./role')


module.exports = app => {
   app.use(
    bodyParser.json(),
    auth, // aqui eu vou garantir que minha routa auth seja publica!
    usuario,
    produto,
    role
   )
}
