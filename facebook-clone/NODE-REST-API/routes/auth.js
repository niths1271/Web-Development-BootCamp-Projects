const router = require('express').Router();
const bcrypt = require('bcrypt');

const User= require('../models/User');
//REGISTER
router.post("/register", async (req,res)=>{

     try{
          //generate new password
          const salt=await bcrypt.genSalt(10);
          const hashedPassword=await bcrypt.hash(req.body.password,salt);
          //create new user
          const newUser= await new User({
               username:req.body.username,
               email:req.body.email,
               password:hashedPassword
          });

     await newUser.save();
        res.status(200).json(newUser);
     }catch(err){
          res.status(500).json(err); 
     }
     res.send("ok");
});

//LOGIN
router.post("/login",async (req,res)=>{
     try{
     const user= await User.findOne({email:req.body.email});
     !user && res.status(404).json("User not found");

     const validPassword = await bcrypt.compare(req.body.password,user.password);
     !validPassword && res.status(400).json("Wrong Password");

     res.status(200).json(user);
     }catch(err){
          res.status(500).json(err);    
     }
});




module.exports = router;