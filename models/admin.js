const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        defalut: Date.now
    }
})

module.exports = mongoose.model('admin',adminSchema)