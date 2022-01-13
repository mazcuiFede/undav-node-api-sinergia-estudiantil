'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express()
const port = process.env.PORT || 3002

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

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

app.get("/api/evento", (req, res) => {
    console.log("GET /api/evento")
    

    Evento.find({}, (err, evento) => {
        if (err) res.status(500).send({message: "hubo un error al obtener los eventos"})
        if (!evento) return res.status(404).send({message: "no hay eventos"})
        res.status(200).send({evento})
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


app.get("/api/duda/:id", (req, res) => {
    console.log("GET /api/duda/:id")
    
    let id = req.params.id

    Duda.findById(id, (err, duda) => {
        if (err) res.status(500).send({message: "hubo un error al obtener la duda"})
        if (!duda) return res.status(404).send({message: "duda no encontrada"})
        res.status(200).send({duda})
    })
})

app.get("/api/duda/tipo/:tipo", (req, res) => {
    console.log("GET /api/duda/:tipo")
    
    let tipo = req.params.tipo

    Duda.find({tipo}, (err, duda) => {
        if (err) res.status(500).send({message: "hubo un error al obtener la duda"})
        if (!duda) return res.status(404).send({message: "duda no encontrada"})
        res.status(200).send({duda})
    })

})

app.put("/api/duda/:id", (req, res) => {
    console.log("PUT /api/duda/:id")
    
    let id = req.params.id
    let body = req.body

    Duda.findByIdAndUpdate(id, body, (err, dudaUpdated) => {
        if (err) res.status(500).send({message: "hubo un error al obtener la duda"})
        if (!dudaUpdated) return res.status(404).send({message: "duda no encontrada"})

        console.log(dudaUpdated)
        res.status(200).send({duda : dudaUpdated})
    })

})

app.get("/api/duda", (req, res) => {
    console.log("GET /api/duda")
    
    Duda.find({}, (err, duda) => {
        if (err) res.status(500).send({message: "hubo un error al obtener las dudas"})
        if (!duda) return res.status(404).send({message: "no hay dudas"})

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

// app.put("/api/duda", (req, res) => {
    
//     console.log("POST /api/duda")
//     console.log(req.body)

//     let duda = new Duda()
//     duda.titulo = req.body.titulo
//     duda.descripcion = req.body.descripcion
//     duda.puntos = 0
//     duda.tags = req.body.tags
//     duda.tipo = req.body.tipo

//     duda.save((err, duda) => {
//         if (err) res.status(500).send({message: "hubo un error al guardar la duda"})

//         res.status(201).send({duda})
//     })
    
// })


app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port)
})