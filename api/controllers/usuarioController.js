const UsuarioService = require('../services/usuarioService')
const usuarioService = new UsuarioService()


class UsuarioController {
    static async cadastrarUsuario(req, res) {

        const { nome, email, senha } = req.body

        try {
            const usuario = await usuarioService.cadastrarUsuario({ nome, email, senha })

            res.status(201).send(usuario)

        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscaTodosUsuarios(req, res) {
        const usuarios = await usuarioService.buscaTodosUsuarios()
        res.status(200).json(usuarios)
    }

    static async buscaTodosUsuarioPorId(req, res) {
        const { id } = req.params
        try {
            const usuarioID = await usuarioService.buscaTodosUsuarioPorId(id)

            res.status(200).json(usuarioID)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarUsuario(req, res) {
        const { id } = req.params
        const { nome, email } = req.body

        try {
            const usuario = await usuarioService.editarUsuario({ id, nome, email })
            res.status(200).json(usuario)
        } catch (error) {
            res.status(400), send({ message: error.message })
        }
    }

    static async deletarUsuario(req, res) {
        const { id } = res.params
        try {
            await usuarioService.deletarUsuario(id)
            res.status(200).send({ message: 'Usuario deletado com sucesso!' })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = UsuarioController