const express = require('express')
const roomModel = require('../models/roomModel')
const roomRouter = express.Router()

roomRouter.get('/getAll', async (req, res) => {
    try{
        const data = await roomModel.find()

        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

roomRouter.get('/getOne', async (req, res) => {
    try{
        const room = req.body.number

        const roomsDB = await roomModel.findOne({ number: room })
        console.log(roomsDB)
        if (!roomsDB) {
            return res.status(404).json({ message: 'Documento no encontrado' })
        }

        res.status(200).json(roomsDB)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

roomRouter.get('/getFilter', async (req, res) => {
    try{
        // Construye el objeto de condiciones basado en los campos del json proporcionado
        const condiciones = {};

        if (req.body.number) condiciones.number = req.body.number;
        if (req.body.type) condiciones.type = req.body.type;
        if (req.body.beds) condiciones.beds = req.body.beds;
        if (req.body.available) condiciones.available = req.body.available;
        if (req.body.price) condiciones.price = req.body.price;

        const data = await roomModel.find(condiciones);

        if (data.length === 0) {
        return res.status(404).json({ message: 'Documento no encontrado' })
        }

        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

roomRouter.post('/new', async (req, res) => {
    const data = new roomModel({
        number: req.body.number,
        type: req.body.type,
        beds: req.body.beds,
        available: req.body.available,
        price: req.body.price
    })

    //console.log(req.body)

    try {
        const dataToSave = await data.save()
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

roomRouter.patch('/update', async (req, res) => {
    try {
        const room = req.body.number
        //const updatedData = req.body;

        const resultado = await roomModel.updateOne({ number: room},
        { $set: {
            type: req.body.type,
            beds: req.body.beds,
            available: req.body.available,
            price: req.body.price}
        })

        //console.log(resultado)

        if (resultado.modifiedCount === 0) {
            return res.status(404).json({ message: 'Documento no encontrado' })
        }

        //res.send(resultado)
        res.status(200).json({ message: 'Documento actualizado exitosamente' })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

roomRouter.delete('/delete', async (req, res) => {
    try {
        const room = req.body.number;
        const data = await roomModel.deleteOne({ number: room })

        if (data.deletedCount === 0) {
            return res.status(404).json({ message: 'Documento no encontrado' })
        }

        //res.send(`Document with ${data.usuario} has been deleted..`)
        res.status(200).json({ message: `Document with ${room} has been deleted..` })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = roomRouter