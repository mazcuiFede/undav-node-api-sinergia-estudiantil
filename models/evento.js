"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const EventoSchema = Schema({
    text: String,
    startDate: Date,
    endDate: Date,
    allDay: Boolean,
    description: String
})

module.exports = mongoose.model("evento", EventoSchema)