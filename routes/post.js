const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// const multer = require('multer');

// Set a storage 
// const storage = multer.diskStorage({

//    // Set a destination where you want to store image
//    destination: function(req, file, cb){
//       cb(null, './uploads/')
//    },

//    // Set a filename 
//    filename: function(req, file, cb){
//       cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
//    }
// });

//set a file filter 
// const fileFilter = (req, file, cb) =>{

//    // Store a file id it is in jpeg, jpg or in png format, else don't store it
//    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
//       cb(null, true);
//    }
//    else{
//       cb(null, false);
//    }
// }

// const upload = multer({

//    //Added a storage path
//    storage: storage,

//    //Set a limit size
//    limits:{
//       fileSize: 1024 * 1024 * 20
//    },

//    // Added file filter
//    fileFilter: fileFilter
// });



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

router.get("/fetchallpost",
   async (req, res) => {
      try {
         const posts = await Post.find({}).limit(5)
         res.json(posts);
      } catch (err) {
         console.error(err.message);
         res.status(500).send("Ineternal Server Error");
      }
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
// router.post("/addpost", fetchuser, upload.single('image'), async (req, res) => {

//    try{
//       console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//       // const { area, description, locality, longtitude, latitude, phoneno, name } = req.body;
//       // console.log(req.body);
//       // console.log(area, description, locality, longtitude, latitude, phoneno, name);
//       // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");


//       // // If there are errors, return bad request and the errors
//       // const errors = validationResult(req);
//       // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",errors);

//       // if (!errors.isEmpty()) {
//       //    return res.status(400).json({ errors: errors.array() });
//       // } 
//       // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//       console.log(req);

//       console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");

//       const newpost = new Post({
//          phoneno, name, latitude, longtitude, area, description, locality, user: req.user.id,
//          postImage: req.file.path
//       });


//       const savedPost = await newpost.save();

//       res.json(savedPost);   
//    }catch(err){
//       console.error(err.message);
//       res.status(500).send("Ineternal Server Error"+err.message);
//    }
// });


module.exports = router;
