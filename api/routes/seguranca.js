const {Router} = require('express')
const SegurancaController = require('../controllers/segurancaController')

const router = Router()

// aqui vai cadastrar o usuario
router
    .post('/segunraca/acl',SegurancaController.cadastrarAcl)
    .post('/seguranca/permissoes-roles', SegurancaController.cadastrarPermissoesRoles)

module.exports = router