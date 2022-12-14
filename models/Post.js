const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Image'
    },
    description:{
        type: String
    },
    name:{
        type: String,
        required: true
    },
    phoneno:{
        type: Number,
        required: true
    },
    area:{
        type: String,
        required: true
    },
    locality:{
        type: String,
        required: true
    },
    longtitude:{
        type: Number,
        required: true
    }, 
    latitude:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('post',postSchema)