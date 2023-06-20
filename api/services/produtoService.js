const { v4: uuidv4 } = require('uuid')
const database = require('../models')

class ProdutoService {
    async cadastrarProduto(dto) {
        const produto = await database.produtos.findOne({
            where: {
                nome: dto.nome
            }
        });

        if (produto) {
            throw new Error('Produto já cadastrado');
        }

        try {
            const newProduto = await database.produtos.create({
                id: uuidv4(),
                nome: dto.nome,
                descricao: dto.descricao,
                preco: dto.preco
            });

            return newProduto;
        } catch (error) {
            console.error('Message error: ', error.message);
            throw error;
        }
    }
}
module.exports = ProdutoService