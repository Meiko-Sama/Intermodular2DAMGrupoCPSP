const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    number: {
      type: Number,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true
    },
    beds: {
      type: Number,
      required: true
    },
    available: {
      type: Boolean,
      default: true
    },
    price: {
      type: Number,
      required: true
    }
  })
  
  const Room = mongoose.model('Room', roomSchema)
  
  module.exports = Room;