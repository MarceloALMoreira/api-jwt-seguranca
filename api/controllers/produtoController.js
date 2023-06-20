const ProdutoService = require('../services/produtoService')
const produtoService = new ProdutoService()

class ProdutoController {
    static async cadastrarProduto(req, res) {
        const { nome, descricao, preco } = req.body
        
        try {
            const produto = await produtoService.cadastrarProduto({ nome, descricao, preco })
            
            res.status(201).json(produto)
            
        } catch (error) {
            console.log('Message error: ', error.message)
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = ProdutoController