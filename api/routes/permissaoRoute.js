const {Router} = require('express')
const PermissaoController = require('../controllers/permissaoController')

const router = Router()

router
    .post('/permissao', PermissaoController.cadastrarPermissao)
    .get('/permissao', PermissaoController.buscarTodasPermissoes)
    .get('/permissao/:id')
    .delete('/permissao/:id')
    .put('/permissao/:id')
    
module.exports = router