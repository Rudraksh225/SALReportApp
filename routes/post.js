const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Admin = require('../models/Admin');
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: get all the notes: GET "/api/post/fetchallpost". No login required

router.get("/fetchpost", fetchuser, async (req, res) => {

   try{
      const posts = await Post.find({ user: req.params.id });
      res.json(posts)

   }catch (err) {
      console.log(err);
      res.status(500).send("Ineternal Server Error");
   }

});

//Fetch all the post

router.get("/fetchallpost", async (req, res) => {
      
      const posts = await Post.find().sort({$natural:-1}).limit(5);
      // const posts = await Post.find().limit(5);
      res.json(posts)
      
   });


//ROUTE 2: add a new post using: POST "/api/post/addnote". Login required

router.post("/addpost",fetchuser ,async (req, res) => {

   try {

      // const { image, area, description, locality, longtitude, latitude, phoneno, name } = req.body;
      const { image, user, area, description, locality, latitude, phoneno, name } = req.body;
      
      console.log(image, area, description, locality, latitude, phoneno, name)
      

      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }


     
      const newpost = new Post({
         image, user: req.user.id, area, description, locality, longtitude:req.body.longtitude, latitude, phoneno, name 
      });

      const savedPost = await newpost.save();

      console.log(savedPost)
      res.json(savedPost);
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error ");
   }
});

module.exports = router;
