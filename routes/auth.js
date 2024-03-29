const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Useradmin = require('../models/Useradmin');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const fetchuser = require('../middleware/fetchuser');
// import Useradmin from '../models/Admin'

// try{
// const Admin = require('../models/Admin')
// }catch(err){  
// console.log(err)
// }

// var jwt = require('jsonwebtoken');

// const JWT_SECRET = "SALReportApp0359"

// ROUTE 1: reate a user using: POST"/api/auth/createuser". No login required
router.post('/createuser',[
    body('email','Enter a valid email').isEmail(),
    body('password','password must be atleast 5 character').isLength({ min: 5 })
],async (req,res) => {

  try{
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    
    //check wether the user with this email exist already
    
      //find for user with this email id already exist or not
      let user = await User.findOne({email:req.body.email});
      if(user){
        return res.status(400).json({error:"Sorry, this email address alredy exist"})
      }

      //change password into hash using bcryptjs
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno,
        password: secPass,
        state: req.body.state,
        city: req.body.city,    
      }) 

      const savedUser = await user.save()

      res.json({msg: "user created succesfully", savedUser})

    } catch(err){
      res.status(500).send("Ineternal Server Error")
    }

})
  
// ROUTE 2: Authenticate a User using : POST "/api/auth/login". No Login Required

router.post('/login',[ 
  body('email','Enter a valid email').isEmail(),
  body('password','Password Cannot be blank').exists()
], async (req,res) => {

  // If there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password} = req.body;

    try{

      let user = await User.findOne({email:req.body.email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }
      
      let users = await User.findOne({email:req.body.email}); 
      const passwordcompare = await bcrypt.compare(password, users.password)
      if(!passwordcompare){
        return res.status(400).json({error:"Please try to login with correct credentials"})
      }

      res.json({msg: "Login Succesfully"})
    }catch(err){
      console.error(err.message)
      res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login Required

router.get('/getuser/',fetchuser, async (req,res) => {

  try {
    
    const user = await User.findById(req.user.id).select("-password")
    if(!user){
      return res.status(400).json({error:"there is not any user wtih this id"})
    }
    res.json(user)
  } catch (err) {
      console.error(err.message)
      res.status(500).send("Internal Server Error")
  }

})

//ROUTE 4: Create a admin "/api/auth/createadmin"

router.post('/createadmin',[
  body('email','Enter a valid email').isEmail(),
  body('password','password must be atleast 5 character').isLength({ min: 5 })
],async (req,res) => {

  // If there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }  
  
  //check wether the admin with this email exist already
  try{
    //find for admin with this email id already exist or not
    let admin = await Useradmin.findOne({email:req.body.email});
    if(admin){
      return res.status(400).json({error:"Sorry, this email address alredy exist"})
    }

    //change password into hash using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    //create a new admin
    admin = await Useradmin.create({
      email: req.body.email,
      password: secPass,
    })
  
    res.json({msg: "Admin created succesfully"})

  } catch(err){
    console.error(err.message)
    res.status(500).send("Ineternal Server Error")
  }

})

//Route 5: Authenticate a admin using "/api/auth/adminlogin" no login required

router.post('/adminlogin',cors(),[ 
  body('email','Enter a valid email').isEmail(),
  body('password','Password Cannot be blank').exists()
],async (req,res) => {

  // If there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {password} = req.body;

    try{
      let admin = await Useradmin.findOne({email:req.body.email});
      if(!admin){
        let success = false
        return res.status(400).json({success, error:"Please try to login with correct credentials"})
      }

      const passwordcompare = await bcrypt.compare(password, admin.password)
      if(!passwordcompare){
        let success = false
        return res.status(400).json({success, error:"Please try to login with correct credentials"})
      }
      let success = true
      res.status(200).json({success, id:admin._id , msg: "Admin login succesfully"}) 

    }catch(err){
      console.error(err.message)
      res.status(500).send("Internal Server Error")
    }
})

module.exports = router 