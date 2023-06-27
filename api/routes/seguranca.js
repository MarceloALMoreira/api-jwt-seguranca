const {Router} = require('express')
const SegurancaController = require('../controllers/segurancaController')

const router = Router()

// aqui vai pefil dos nossos usuarios cadastrar o usuario
router
    .post('/seguranca/acl',SegurancaController.cadastrarAcl)
    .post('/seguranca/permissoes-roles', SegurancaController.cadastrarPermissoesRoles)

module.exports = router