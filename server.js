require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL

// Conexión a MongoDB
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.error(error))

database.once('connected', () => console.log('Database Connected'))

const app = express()

app.use(express.json())

// De esta manera indicamos que no vamos a recibir peticiones enviadas
// directamente de un formulario, sino que sera todo enviado en json
app.use(express.urlencoded({ extended: false }));

const roomRouter = require('./routes/roomRouter')
// middleware para acceder a usuarios
app.use('/room',roomRouter)

app.listen(3000, () => console.log(`Sever started`))

exports.app = app