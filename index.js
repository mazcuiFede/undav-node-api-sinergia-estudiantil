const mongoose = require("mongoose")
const app = require("./app")
const config = require("./config")

mongoose.connect(config.db, (err, res) => {
  if (err) throw err
  console.log("Conexión a database establecida")

  app.listen(config.port, () => {
    console.log("Servidor corriendo en el puerto " + config.port)
  })
})
