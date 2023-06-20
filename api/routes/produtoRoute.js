const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')

const router = Router()

router.get('/produto', (req, res) => {
    res.status(201).send({
        nome: "teste"
    })
})

router.post('/produto', ProdutoController.cadastrarProduto)


module.exports = router