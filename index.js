'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const dotenv = require('dotenv');
dotenv.config();

const app = express()
const port = process.env.PORT || 3002

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const User = require('./models/user');
const { CancellationToken } = require('mongoose/node_modules/mongodb');

mongoose.connect(process.env.CONN_STRING, (err, res) => {
    if (err) throw err
    console.log("Conexión a database establecida")
})

app.get("/api/user", (req, res) => {

})

app.post("/api/user", (req, res) => {
    
    console.log("POST /api/user")
    console.log(req.body)

    let user = new User()
    user.nombre = req.body.nombre
    user.apellido= req.body.apellido
    user.password= req.body.password
    user.documento= req.body.documento
    user.avatarUrl= req.body.avatarUrl

    user.save((err, user) => {
        if (err) res.status(500).send({message: "hubo un error al guardar el usuario"})

        res.status(204).send({user})
    })
})


app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port)
})