const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require('multer');

// Set a storage 
const storage = multer.diskStorage({

   // Set a destination where you want to store image
   destination: function(req, file, cb){
      cb(null, './uploads')
   },

   // Set a filename 
   filename: function(req, file, cb){
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
   }
});

//set a file filter 
const fileFilter = (req, file, cb) =>{

   // Store a file id it is in jpeg, jpg or in png format, else don't store it
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
      cb(null, true);
   }
   else{
      cb(null, false);
   }
}

const upload = multer({
   storage: storage,
   limits:{
      fileSize: 1024 * 1024 * 20
   },
   fileFilter: fileFilter
});
const Image = require('../models/Image')
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: get all the notes: GET "/api/post/fetchallpost". No login required

router.post("/fetchallpost", fetchuser, async (req, res) => {
   try {
      const posts = await Post.find({ user: req.user.id });
      res.json(posts);
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Ineternal Server Error");
   }
});

// ROUTE 2: add a new post using: POST "/api/post/addnote". Login required

router.post("/addpost", fetchuser, upload.single('image'), async (req, res) => {
   
   try{
      const { area, description, locality, longtitude, latitude, phoneno, name } = req.body;

      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      } 
      
      const newpost = new Post({
         phoneno, name, latitude, longtitude, area, description, locality, user: req.user.id
      });


      const savedPost = await newpost.save();

      res.json(savedPost);   
   }catch(err){
      console.error(err.message);
      res.status(500).send("Ineternal Server Error");
   }
});

module.exports = router;
