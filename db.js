const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://rudrakshjani:Sorttros.3001@cluster0.kj8mtkj.mongodb.net/ReportApp"

const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Succesfully")
    })
}

module.exports = connectToMongo