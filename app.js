const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')

const apicache = require('apicache')
const cache = apicache.options({
  headers: {
    'cache-control': 'no-cache',
  },
}).middleware


connectToMongo()
const app = express()

app.use(express.json({limit: '1000mb'}))
app.use(cors())

app.use(cache('5 minutes')) 

/*Make a upload folder available publically for fetching images
  1. 1st part will be ignore '/upload' so you can access form browser with upload router also
     (basically it ignores '/uploads' in link that recieve)
  2. 2nd part will make upload folder static
*/
app.use('/uploads',express.static('uploads'))

//Available routes
// app.use(url + api + '/auth', require('./routes/auth'))
app.use('/api/auth', require('./routes/auth'));
app.use('/api/post', require('./routes/post'));

// const userRouter = require('./routes/users')    
// app.use('/users', userRouter)

app.listen(process.env.PORT || 27017,function(){
    console.log('Server started')
})
 