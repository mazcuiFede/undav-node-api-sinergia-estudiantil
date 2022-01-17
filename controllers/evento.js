"use strict"

const Evento = require('./../models/evento')
const service = require('../services')

function createEvento (req, res) {
    const token = req.headers.authorization.split(' ')[1]

    console.log("POST /api/evento")

    service.decodeToken(token)
        .then(response => {
            
            let evento = new Evento()

            evento.text = req.body.text
            evento.startDate = req.body.startDate
            evento.endDate = req.body.endDate
            evento.allDay = req.body.allDay
            evento.description = req.body.description
            evento.userId = response

            evento.save((err, evento) => {
                if (err) res.status(500).send({message: "hubo un error al guardar el evento"})

                res.status(201).send({evento})
            })            
        })

        .catch(response => {
            return res.status(response.status)
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

function deleteEvento(req, res) {
    console.log("DELETE /api/evento")

    let eventoId = req.params.eventoId
    
    Evento.findById(eventoId, (err, evento) => {
        if (err) res.status(500).send({message: `Error al borrar el evento: ${err}`})

        evento.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar el evento: ${err}`})
            res.status(200).send({message: 'El evento ha sido eliminado'})
        })
    })
}


module.exports = {
    createEvento,
    getEventos,
    deleteEvento
}