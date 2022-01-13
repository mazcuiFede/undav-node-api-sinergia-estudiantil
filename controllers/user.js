'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {

    const user = new User({
        documento: req.body.documento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        avatarUrl: req.body.avatarUrl,
        password: req.body.password
    })

    user.save((err) => {
        if (err) res.status(500).send({message: "ha ocurrido un error"})
        
        return res.status(201).send({token: service.createToken(user)})
    })

}

// function signIn (req, res){
//     console.log("POST /api/user")
//     console.log(req.body)

//     User.findOne({documento: req.body.documento}, (err, user) => {
//         if (err) return res.status(500).send({message: err})
//         if (user.length == 0) return res.status(404).send({message: "no existe el usuario"})
        
//         req.user = user
//         console.log()
        
//         res.status(200).send({
//             message: "loggeado correcto",
//             token: service.createToken(user)
//         })
//     })
// }


const signIn = (req, res) => {
    User.findOne({ documento: req.body.documento }, (err, user) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.documento}` })
  
      return user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
        if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.documento}` })
  
        req.user = user
        return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
      });
  
    }).select('_id email +password');
  }

module.exports = {
    signUp,
    signIn
}