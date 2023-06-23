const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class UsuarioService {

    async cadastrarUsuario(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })

        if (usuario) {
            throw new Error('Usuario já cadastrado')
        }

        try {
            const senhaHash = await hash(dto.senha, 8)

            const novoUsuario = await database.usuarios.create({

                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })
            return novoUsuario

        } catch (error) {
            throw new Error('Erro ao cadastar usuario')
        }
    }

    async buscaTodosUsuarios() {
        const usuarios = await database.usuarios.findAll()
        return usuarios
    }

    async buscaTodosUsuarioPorId(id) {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        })
        if (!usuario) {
            throw new Error('Usuário informado não foi cadastrado!')
        }

        return usuario
    }

    async editarUsuario(dto) {
        const usuario = await this.buscaTodosUsuarioPorId(dto.id)

        try {
            usuario.nome = dto.nome
            usuario.email = dto.email
            await usuario.save()
            return usuario
        } catch (error) {
            throw new Error('Erro ao editar usuário!')
        }
    }

    async deletarUsuario(id) {
        await this.buscaTodosUsuarioPorId(id)
        try {
            await database.usuarios.detroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar o Usuário!')
        }
    }

}


module.exports = UsuarioService