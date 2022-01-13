
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3002,
    db: process.env.CONN_STRING ,
    SECRET_TOKEN: "undavtesismazcui"
}