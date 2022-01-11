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
const Duda = require('./models/duda');
const Evento = require('./models/evento');

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

        res.status(201).send({user})
    })
})

app.post("/api/evento", (req, res) => {
    
    console.log("POST /api/evento")
    console.log(req.body)

    let evento = new Evento()
    evento.text = req.body.text
    evento.startDate = req.body.startDate
    evento.endDate = req.body.endDate
    evento.allDay = req.body.allDay

    evento.save((err, evento) => {
        if (err) res.status(500).send({message: "hubo un error al guardar el evento"})

        res.status(201).send({evento})
    })
    
})


app.get("/api/duda", (req, res) => {
    console.log("POST /api/duda")
    
    let dudaId = req.params.dudaId

    Duda.findById(dudaId, (err, duda) => {
        if (err) res.status(500).send({message: "hubo un error al obtener la duda"})
        if (!product) return res.status(404).send({message: "duda no encontrada"})

        res.status(200).send({duda})
    })

})

app.post("/api/duda", (req, res) => {
    
    console.log("POST /api/duda")
    console.log(req.body)

    let duda = new Duda()
    duda.titulo = req.body.titulo
    duda.descripcion = req.body.descripcion
    duda.puntos = 0
    duda.tags = req.body.tags
    duda.tipo = req.body.tipo

    duda.save((err, duda) => {
        if (err) res.status(500).send({message: "hubo un error al guardar la duda"})

        res.status(201).send({duda})
    })
    
})


app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port)
})