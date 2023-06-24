// Criação do crud

const { Router } = require('express')

const RoleControler = require('../controllers/roleController')

const router = Router()

router
    .post('/roles', RoleControler.cadastrar)
    .get('/role')
    .post('/role/:id')
    .delete('/role/:id')
    .put('/role/:id')
    
module.exports = router