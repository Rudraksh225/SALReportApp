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

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/post', require('./routes/post'))

// const userRouter = require('./routes/users')    
// app.use('/users', userRouter)

app.listen(27017, function(){
    console.log('Server started')
})
 