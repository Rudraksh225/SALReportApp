const mongoose = require('mongoose')

// const mongoURI = "mongodb+srv://rudrakshjani:Sorttros.3001@cluster0.kj8mtkj.mongodb.net/ReportApp"
// const mongoURI = "mongodb+srv://rudraksh:Sorttros.3001@cluster0.64nwazg.mongodb.net/?retryWrites=true&w=majority"
const mongoURI = "mongodb+srv://rudrakshjani:Sorttros.3001@cluster0.kj8mtkj.mongodb.net/ReportApp"


const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Succesfully")
    })
}

// let dbConnection;

// module.exports = {
//     connectToServer: function (callback) {
//       client.connect(function (err, db) {
//         if (err || !db) {
//           return callback(err);
//         }
  
//         dbConnection = db.db("ReportApp");
//         console.log("Successfully connected to MongoDB.");
  
//         return callback();
//       });
//     },
  
//     getDb: function () {
//       return dbConnection;
//     },
//   };

module.exports = connectToMongo     