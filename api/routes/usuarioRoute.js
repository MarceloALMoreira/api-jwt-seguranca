const { Router } = require('express')
const UsuarioController = require('../controllers/usuarioController')
const autenticado = require('../middleware/Autenticado')

const router = Router()
router.use(autenticado) // aqui todos os nossos endpoint vai usar o middleware de aunteticado
router
    .post('/usuarios', UsuarioController.cadastrarUsuario)
    .get('/usuarios', UsuarioController.buscaTodosUsuarios)
    .get('/usuarios/id/:id', UsuarioController.buscaTodosUsuarioPorId)
    .put('/usuarios/id/:id', UsuarioController.editarUsuario)
    .delete('/usuarios/id/:id', UsuarioController.deletarUsuario)

module.exports = router