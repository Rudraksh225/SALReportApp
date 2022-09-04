const express = require('express')
const connectToMongo = require('./db')
// const url = 'mongodb://localhost/ReportApp' 
connectToMongo()
const app = express()

// const api = "C1RfooeVScCf4TlPrM5mhI3zNmYcGmF59cDhvwVIjYYVkDhFJvTBJbMzE5uPIlMy"
// mongoose.connect(url)
// const con = mongoose.connection

// con.on('open', function(){
//     console.log('connected...')
// })

app.use(express.json())

/*Make a upload folder available publically for fetching images
  1. 1st part will be ignore '/upload' so you can access form browser with upload router also
     (basically it ignores '/uploads' in link that recieve)
  2. 2nd part will make upload folder static
*/
app.use('/uploads',express.static('uploads'))

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/post', require('./routes/post'))

// const userRouter = require('./routes/users')    
// app.use('/users', userRouter)

app.listen(27017, function(){
    console.log('Server started')
})
 