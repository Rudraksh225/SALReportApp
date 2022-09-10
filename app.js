const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
const caches = require('apicache')
const cache = caches.middleware
// const url = 'mongodb://localhost/ReportApp' 
connectToMongo()
const app = express()

// const api = "C1RfooeVScCf4TlPrM5mhI3zNmYcGmF59cDhvwVIjYYVkDhFJvTBJbMzE5uPIlMy"
// mongoose.connect(url)
// const con = mongoose.connection

// con.on('open', function(){
//     console.log('connected...')
// })

app.use(express.json({limit: '1000mb'}))
app.use(cors())
app.use(cache('5 minute'))

/*Make a upload folder available publically for fetching images
  1. 1st part will be ignore '/upload' so you can access form browser with upload router also
     (basically it ignores '/uploads' in link that recieve)
  2. 2nd part will make upload folder static
*/
app.use('/uploads',express.static('uploads'))


//Mongo DB API Key

// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "users",
//     "database": "test",
//     "dataSource": "Cluster0",
//     "projection": {
//         "_id": 1
//     }
// });
            
// var config = {
//     method: 'post',
//     url: 'https://data.mongodb-api.com/app/data-jaabs/endpoint/data/v1/action/findOne',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//       'api-key': 'ADrCFDhxwapdkRbNRbGAMn8S5qFNVwoVdmu6tRvnlmLIo0nkNE0SC6XfumRuAoTf',
//     },
//     data: data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });


// const url = 'https://data.mongodb-api.com/app/data-jaabs/endpoint/data/v1'
// api = "ADrCFDhxwapdkRbNRbGAMn8S5qFNVwoVdmu6tRvnlmLIo0nkNE0SC6XfumRuAoTf"
//Available routes
// app.use(url + api + '/auth', require('./routes/auth'))
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'));

// const userRouter = require('./routes/users')    
// app.use('/users', userRouter)

app.listen(process.env.PORT || 27017,function(){
    console.log('Server started')
})
 