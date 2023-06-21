const {Router} = require('express')

const UsuarioController = require('../controllers/usuarioController')

const router = Router()

router.post('/usuarios', UsuarioController.cadastrarUsuario)
router.get('/usuarios', UsuarioController.buscaTodosUsuarios)
router.get('/usuarios/id/:id', UsuarioController.buscaTodosUsuarioPorId)


module.exports = router