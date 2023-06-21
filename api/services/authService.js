const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

class AuthService {
    async login(dto) {

        // vamos ver se o usuario que estamos recebendo no controller existe.
        // usamos o service para fazer essa consulta

        const usuario = await database.usuarios.findOne({
            attributes: ['id', 'email', 'senha'],
            where: {
                email: dto.email
            }
            // aqui o filtro where, vai ver se o email existe no banco
        })

        // vamos verificar se nosso usuario está cadastrado! mais vamos usar uma nota de negação '!'
        if (!usuario) {
            throw new Error('usuario não cadastrado!')
        }

        /* aqui vamos usar o compare do bcryptjs para 
         comparar se a senha que estamos recendo do controller é igual a senha cadastrada no banco*/
        const senhaIguais = await compare(dto.senha, usuario.senha)


        // aqui vamos usar uma nota de negação que vai entra na condição caso seja false
        if (!senhaIguais) {
            throw new Error('Usuario ou senha invalido(a)!')
        }


        // Crinado o token com JWT ecriando o tempo que esse toke ficarar disponivel

        const acessToken = sign({
            id: usuario.id,
            email: usuario.email
        }, jsonSecret.secret,{
            expiresIn: 86400
        })

        return {acessToken}
    }
}

module.exports = AuthService