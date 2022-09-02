const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type: String,
        required: true
    },
    image:{
        data: Buffer,
        contentType: String
    }
})

module.exports = ImageModel = mongoose.model('Image',ImageSchema)