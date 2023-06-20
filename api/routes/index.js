const bodyParser = require('body-parser')
const express = require('express')

const produto = require('./produtoRoute')
const usuario = require('./usuarioRoute')



module.exports = app => {
    app.use(express.json())
    app.use(produto)
    app.use(usuario)
}
