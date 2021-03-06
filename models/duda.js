"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DudaSchema = Schema({
  titulo: String,
  descripcion: String,
  puntos: Number,
  createdAt: { type: Date, default: Date.now() },
  tags: [String],
  tipo: { type: String, enum: ["universidad", "trabajo", "tecnologia"] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  comentarios: [
    {
      userId: String,
      comId: String,
      fullName: String,
      avatarUrl: String,
      text: String,
      replies: [
        {
          userId: String,
          comId: String,
          fullName: String,
          avatarUrl: String,
          text: String,
        },
      ],
    },
  ],
})

module.exports = mongoose.model("duda", DudaSchema)
