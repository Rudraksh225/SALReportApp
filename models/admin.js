const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
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