const { verify, decode } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')


module.exports = async (req, res, next) => {
    //vamos receber o nosso token
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send('Ascess token não informado')
    }

    //Verificar se é valido ou não!
    const [, accessToken] = token.split(" ")

    try {
        verify(accessToken, jsonSecret.secret)

        const { id, email } = await decode(accessToken)

        req.usuarioId = id
        req.usuarioEmail = email

        return next()

    } catch (error) {
        res.status(401).send('Usuário não autorizado!')
    }
}