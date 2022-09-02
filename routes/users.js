const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', async(req, res) => {
    try{
        const Users = await User.find()
        res.json(Users)
    } 
    catch(err){
        res.send(' Error' + err)
    }
})

router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.json(user) 
    } 
    catch(err){
        res.send(' Error' + err)
    }
})

router.post('/',async(req,res) => { 

    const userd = new User({
        name: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno
    })  

    try{
        const u1 = await User.save()
        res.json(u1)
    } catch(err){
        res.send('Error: '+ err)
    }
})

router.patch('/:id',async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        
        if(req.body.hasOwnProperty('name')){
            user.name = req.body.name 
        }


        if(req.body.hasOwnProperty('email')){
            user.email = req.body.email   
        }

        if(req.body.hasOwnProperty('phoneno')){
            user.phoneno = req.body.phoneno
        }
        const u1 = await user.save()
        res.send(u1)

    }catch(err){
        res.send('Error: ' + err)
    }
})

module.exports = router 