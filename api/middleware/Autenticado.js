const { verify, decode } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')


module.exports = async (req, res, next) => {
    //vamos receber o nosso token
    const token = req.headers.authorization

    if (token) {
        res.status(401).send('Acess toke não informado')
    }

    //Verificar se é valido ou não!
    const [, acessToken] = token.split(" ")

    try {
        verify(acessToken, jsonSecret.secret)

        const { id, email } = await decode(acessToken)

        req.usuarioId = id
        req.usuarioEmail = email

        return next()

    } catch (error) {
        res.status(401).send('Usuário não autorizado!')
    }
}