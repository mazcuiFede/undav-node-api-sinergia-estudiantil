"use strict"

const Evento = require('./../models/evento')

function createEvento (req, res) {

    console.log("POST /api/evento")
    console.log(req.body)

    let evento = new Evento()
    evento.text = req.body.text
    evento.startDate = req.body.startDate
    evento.endDate = req.body.endDate
    evento.allDay = req.body.allDay
    evento.description = req.body.description

    evento.save((err, evento) => {
        if (err) res.status(500).send({message: "hubo un error al guardar el evento"})

        res.status(201).send({evento})
    })
        
}


function getEventos(req, res) {
    console.log("GET /api/evento")

    Evento.find({}, (err, evento) => {
        if (err) res.status(500).send({message: "hubo un error al obtener los eventos"})
        if (!evento) return res.status(404).send({message: "no hay eventos"})
        res.status(200).send({evento})
    })
}

module.exports = {
    createEvento,
    getEventos
}