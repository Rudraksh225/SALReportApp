const mongoose = require('mongoose')

const userAdminSchema = new mongoose.Schema({
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

 const Useradmin = mongoose.model('Useradmin',userAdminSchema) 
 module.exports = Useradmin