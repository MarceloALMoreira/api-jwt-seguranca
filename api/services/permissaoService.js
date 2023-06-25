const database = require('../models')
const uuid = require('uuid')

class PermissaoService {

    async cadastrarPermissao(dto) {
        const permisao = database.permissoes.findOne({
            where: {
                nome: dto.nome
            }
        })
        if(!permisao){
            throw new Error('Permissão já cadastrada!')
        }
        try {
            const newPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            })
            return newPermissao
        } catch (error) {
            throw new Error('Erro ao cadastrar Permissão')
        }
    }

    async buscarPermissao(){
    }
}

module.exports = PermissaoService