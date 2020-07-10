const express = require('express')
require('dotenv').config()
const path = require('path')
const cors = require('cors')
const {port} = require('./config/server')
const routes = require('./routes')
const {errors} = require('celebrate')





const app = express();

app.use(cors())
app.use(express.json())
app.use('/image', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use('/api', routes)
app.use(errors())

app.listen(port, () => console.log("Servidor iniciado"))

module.exports = {port}