const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    header: String,
    message: String,
    position: {
        x: Number,
        y: Number,
    },
    color: String,
})

module.exports = mongoose.model('Message', messageSchema)