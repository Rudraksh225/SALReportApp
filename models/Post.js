const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
    postImage:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('post',postSchema)