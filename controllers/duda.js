"use strict"

const Duda = require("./../models/duda")
const service = require("../services")
const User = require("../models/user")

function createDuda(req, res) {
  const token = req.headers.authorization.split(" ")[1]

  service.decodeToken(token).then((response) => {
    User.findOne({ _id: response }, (err, user) => {
      if (err) return res.status(500).send({ msg: `Error: ${err}` })
      if (!user) return res.status(404).send({ msg: `no existe el usuario` })

      let duda = new Duda()

      duda.titulo = req.body.titulo
      duda.descripcion = req.body.descripcion
      duda.puntos = 0
      duda.tags = req.body.tags
      duda.tipo = req.body.tipo
      duda.user = user
      duda.createdAt = new Date()

      console.log("el tipo es " + req.body.tipo)

      duda.save((err, duda) => {
        console.log(duda)
        if (err)
          res.status(500).send({ message: "hubo un error al guardar la duda" })

        return res.status(201).send({ duda })
      })
    })
  })
}

function deleteDuda(req, res) {
  let id = req.params.dudaId

  Duda.findById(id, (err, dudaEncontrada) => {
    if (err)
      res.status(500).send({ message: `Error al borrar la duda: ${err}` })

    dudaEncontrada.remove((err) => {
      if (err)
        res.status(500).send({ message: `Error al borrar la duda: ${err}` })
      res.status(200).send({ message: "la duda ha sido eliminado" })
    })
  })
}

function getDudas(req, res) {
  console.log("GET /api/duda")

  Duda.find({}, (err, duda) => {
    if (err)
      res.status(500).send({ message: "hubo un error al obtener las dudas" })
    if (!duda) return res.status(404).send({ message: "no hay dudas" })

    res.status(200).send({ duda })
  })
    .populate("user")
    .sort([["createdAt", -1]])
}

function getDudaByTipo(req, res) {
  console.log("GET /api/duda/:tipo " + req.params.tipo)

  let tipo = req.params.tipo

  if (tipo !== "undefinied") {
    Duda.find({ tipo }, (err, duda) => {
      if (err)
        res.status(500).send({ message: "hubo un error al obtener la duda" })
      if (!duda) return res.status(404).send({ message: "duda no encontrada" })
      res.status(200).send({ duda })
    })
  }
}

function getDudaById(req, res) {
  console.log("GET /api/duda/:id")
  let id = req.params.id

  Duda.findById(id, (err, duda) => {
    if (err)
      res.status(500).send({ message: "hubo un error al obtener la duda" })
    if (!duda) return res.status(404).send({ message: "duda no encontrada" })
    res.status(200).send({ duda })
  })
}
function putDudaComments(req, res) {
  console.log("PUT /api/duda/:id")

  let id = req.params.id
  let body = req.body

  Duda.findByIdAndUpdate(id, body, (err, dudaUpdated) => {
    if (err)
      res.status(500).send({ message: "hubo un error al obtener la duda" })
    if (!dudaUpdated)
      return res.status(404).send({ message: "duda no encontrada" })

    console.log(dudaUpdated)
    res.status(200).send({ duda: dudaUpdated })
  })
}

module.exports = {
  createDuda,
  getDudas,
  getDudaByTipo,
  getDudaById,
  putDudaComments,
  deleteDuda,
}
