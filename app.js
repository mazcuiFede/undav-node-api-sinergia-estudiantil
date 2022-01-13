'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const api = require('./routes')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use('/api', api)

module.exports = app