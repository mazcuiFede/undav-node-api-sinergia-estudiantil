"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DudaSchema = Schema({
    id: String,
    titulo: String,
    descripcion: String,
    puntos: String,
    tags: String,
    createdAt: Date,
    modifiedAt: Date,
    tipo: {type: String, enum: ["universidad", "trabajo", "tecnología"]},
    comentarios: [
        {
            userId: String,
            comId: String,
            fullName: String,
            avatarUrl: String,
            text: String,
            replies: [{
                userId: String,
                comId:String,
                fullName:String,
                avatarUrl:String,
                text:String,
            }]
        }
    ]
})

mongoose.model("duda", DudaSchema)