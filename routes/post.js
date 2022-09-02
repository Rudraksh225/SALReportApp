const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const multer = require('multer');
const upload = multer({dest: 'uploads/'}) 
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
   try {
      const { img, area, description, locality, longtitude, latitude, phoneno, name } = req.body;
      // If there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      } 

      // // Image Storage
      // const Storage = multer.diskStorage({
      //    destination: "uploads",
      //    filename: (req, file, cb) => { 
      //       cb(null, file.originalname);
      //    },
      // });
      
      // // Upload image at storage
      // const upload = multer({
      //    storage: Storage 
      // }).single('testImage')

      // // make a Image model with its id
      // upload((err)=>{
      //    if(err){
      //       console.log(err)
      //    }
      //    else{
      //       const newImage = new Image({
      //          user: req.user.id,
      //          image: {
      //             data: req.file.filename,
      //             contentType: "image/png"
      //          },
               
      //       });
      //       // save that image
      //       const savedImage = newImage.save()
      //    }
      // })
      

      console.log(req.file);

      // const findImage = await Image.findOne({user
      //    :"req.user.id"})
      // res.send(findImage.id)
      
      const newpost = new Post({
         area, description, locality, longtitude, latitude, phoneno, name, user : req.user.id,
         // img : findImage.id
      });


      const savedPost = await newpost.save();

      res.json(savedPost);

   } catch (err) {
      console.error(err.message);
      res.status(500).send("Ineternal Server Error");
   }
});

// // Image Storage
// const Storage = multer.diskStorage({
//    destination: "uploads",
//    filename: (req, file, cb) => { 
//       cb(null, file.originalname);
//    },
// });

// // Upload image at storage
// const upload = multer({
//    storage: Storage 
// }).single('Img')

// //ROUTE 3: upload an image using: POST "/api/post/upload"
// router.post('/upload',(req,res)=>{
//    upload(req,res,(err) => {
//       if(err){
//          console.log(err)
//       }
//       else{
//          const newImage = new ImageModel({
//             name: req.body.name,
//             image:{
//                data: req.file.filename,
//                contentType: "image/jpg",
//             }
//          })
//       }
//    })
// })

module.exports = router;
