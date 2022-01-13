"use strict"

const Duda = require('./../models/duda')


function createDuda (nuevaDuda) {
    let duda = new Duda()

    duda.titulo = nuevaDuda.titulo
    duda.descripcion = nuevaDuda.descripcion
    duda.puntos = 0
    duda.tags = nuevaDuda.tags
    duda.tipo = nuevaDuda.tipo

    duda.save((err, duda) => {
        if (err) res.status(500).send({message: "hubo un error al guardar la duda"})

        res.status(201).send({duda})
    })
}

function getDudas (req, res) {
    console.log("GET /api/duda")
    
    Duda.find({}, (err, duda) => {
        if (err) res.status(500).send({message: "hubo un error al obtener las dudas"})
        if (!duda) return res.status(404).send({message: "no hay dudas"})

        res.status(200).send({duda})
    })
}

function getDudaByTipo (req, res) {
        console.log("GET /api/duda/:tipo")
        
        let tipo = req.params.tipo
    
        if (tipo !== "undefinied"){
            Duda.find({tipo}, (err, duda) => {
                if (err) res.status(500).send({message: "hubo un error al obtener la duda"})
                if (!duda) return res.status(404).send({message: "duda no encontrada"})
                res.status(200).send({duda})
            })
        }
} 

function getDudaById (req, res) {
    console.log("GET /api/duda/:id")
    let id = req.params.id

    Duda.findById(id, (err, duda) => {
        if (err) res.status(500).send({message: "hubo un error al obtener la duda"})
        if (!duda) return res.status(404).send({message: "duda no encontrada"})
        res.status(200).send({duda})
    })

}
function putDudaComments (req, res) {
    console.log("PUT /api/duda/:id")
    
    let id = req.params.id
    let body = req.body

    Duda.findByIdAndUpdate(id, body, (err, dudaUpdated) => {
        if (err) res.status(500).send({message: "hubo un error al obtener la duda"})
        if (!dudaUpdated) return res.status(404).send({message: "duda no encontrada"})

        console.log(dudaUpdated)
        res.status(200).send({duda : dudaUpdated})
    })
    
}

module.exports = {
    createDuda,
    getDudas,
    getDudaByTipo,
    getDudaById,
    putDudaComments
}