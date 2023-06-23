// Criação do crud

const { Router } = require('express')

const router = Router()

router
    .post('/roles')
    .get('/role')
    .post('/role/:id')
    .delete('/role/:id')
    .put('/role/:id')

module.exports = router