const mongoose = require('mongoose')
require('dotenv').config()

 const mongoURI = process.env.MONGOURI

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
