'use strict'

const express = require('express')
const dudaController = require("../controllers/duda")
const eventoController = require("../controllers/evento")
const userController = require("../controllers/user")
const auth = require('../middlewares/auth')
const api = express.Router()

api.get("/evento", auth, eventoController.getEventos)
api.post("/evento", auth, eventoController.createEvento)

api.get("/duda", auth, dudaController.getDudas)
api.get("/duda/:id", auth, dudaController.getDudaById)
api.get("/duda/tipo/:tipo", auth, dudaController.getDudaByTipo)
api.put("/duda/:id", auth, dudaController.putDudaComments)
api.post("/duda", auth, dudaController.createDuda)

api.post('/registrarse', userController.signUp)
api.post('/login', userController.signIn)


module.exports = api
