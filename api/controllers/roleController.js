const RoleService = require('../services/Services')
const roleService = new RoleService()

class RoleControler {
    static async cadatrar(req, res) {
        const { nome, descricao } = req.body

        try {
            const role = roleService.cadatrar({ nome, descricao })
            res.status(201).send(role)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

}

module.exports = RoleControler