"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const EventoSchema = Schema({
    id: String,
    text: String,
    startDate: String,
    endDate: String,
    allDay: String,
})

module.exports = mongoose.model("evento", EventoSchema)