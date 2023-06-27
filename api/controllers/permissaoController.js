const PermissaoService = require('../services/permissaoService')
const permisaoService = new PermissaoService()

class PermissaoController {

    static async cadastrarPermissao(req, res) {
        const { nome, descricao } = req.body

        try {
            const permissao = await permisaoService.cadastrarPermissao({ nome, descricao })
            res.status(201).send(permissao)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }
    
}
module.exports = PermissaoController