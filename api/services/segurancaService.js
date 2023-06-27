const database = require('../models')
const Sequelize = require('sequelize')

class SegurancaService {


    // cadastro de Perfies e Permissoes para o nossos Usuarios
    async cadastrarAcl(dto) {
        const usuario = await database.usuarios.findOne({
            include: [
                {
                    nodel: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao']
                },
                {
                    mode: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao']
                }
            ],
            where: {
                id: dto.usuarioId
            }
        })
        if (!usuario) {
            throw new Error('Usuario não cadastrado!')
        }

        // aqui ta retornando apenas perfils validos
        const rolesCadastradas = await database.roles.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.roles
                }
            }
        })

        // aqui ta retornando apenas Permissoes  validas
        const permissoesCadastradas = await database.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })

        //removendo 
        await usuario.removeUsuario_roles(usuario.usuario_roles)
        await usuario.removeUsuario_permissoes(usuario.usuario_permissoes)

        //adicionando
        await usuario.addUsuario_roles(rolesCadastradas)
        await usuario.addUsuario_permissoes(permissoesCadastradas)


        //fazendo uma nova consulta para saber se esta com os novos usuarios
        const novoUsuarios = await database.usuarios.findOne({
            include: [
                {
                    nodel: database.roles,
                    as: 'usuario_roles',
                    attributes: ['id', 'nome', 'descricao']
                },
                {
                    mode: database.permissoes,
                    as: 'usuario_permissoes',
                    attributes: ['id', 'nome', 'descricao']
                }

            ],
            where: {
                id: dto.usuarioId
            }
        })
        return novoUsuarios
    }

    async cadastrarPermissoesRoles(dto) {
        const role = await database.roles.findOne({
            include: [
                {
                    model: 'database.permissoes',
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome', 'descricao']
                }
            ]
        })
        if (!role) {
            throw new Error('Role não cadastrada!')
        }
        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissoes
                }
            }
        })

        // removendo as permissoes que existe para esse perfil
        await role.removeRoles_das_permissoes(role.roles_das_permissoes)

        // adicionando as novas permissoes

        await role.addRoles_das_permissoes(permissoesCadastradas)

        // Uma nova busca para retornar o nosso usuario atualizado

        const novaRole = await database.roles.findOne({
            include: [
                {
                    model: 'database.permissoes',
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'nome', 'descricao']
                }
            ],
            where: {
                id: dto.roleId
            }
        })

        return novaRole
    }

}

module.exports = SegurancaService