"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UsersSchema = Schema({
    nombre: String,
    apellido: String,
    password: String,
    documento: String,
    avatarUrl: String,
})

module.exports = mongoose.model("user", UsersSchema)