// const { default: mongoose } = require('mongoose')
const mongoose = require('mongoose')
// const mongoose = new mongoose
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneno:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        defalut: Date.now
    }
})

const User = mongoose.model('User',userSchema) 
module.exports = User