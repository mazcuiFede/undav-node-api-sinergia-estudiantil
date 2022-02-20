'use strict'

const express = require('express')
const dudaController = require("../controllers/duda")
const eventoController = require("../controllers/evento")
const userController = require("../controllers/user")
const auth = require('../middlewares/auth')
const api = express.Router()

api.get("/evento", auth, eventoController.getEventos)
api.post("/evento", auth, eventoController.createEvento)
api.delete("/evento/:eventoId", auth, eventoController.deleteEvento)

api.get("/dudas", auth, dudaController.getDudas)
api.get("/duda/:id", auth, dudaController.getDudaById)
api.get("/duda/tipo/:tipo", auth, dudaController.getDudaByTipo)
api.put("/duda/:id", auth, dudaController.putDudaComments)
api.post("/duda", auth, dudaController.createDuda)
api.delete("/duda/:dudaId", auth, dudaController.deleteDuda)

api.post('/registrarse', userController.signUp)
api.post('/login', userController.signIn)
api.post('/loginadmin', userController.signInAdmin)
api.get('/user', auth, userController.getUserData)
api.get('/users', auth, userController.getUsers)
api.put('/user', auth, userController.putUserStatus)
api.put('/user/:id', auth, userController.putUserStatusAdmin)

module.exports = api