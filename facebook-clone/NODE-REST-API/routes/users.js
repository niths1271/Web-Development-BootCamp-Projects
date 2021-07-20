const router = require('express').Router();
const User= require('../models/User');
const bcrypt = require('bcrypt');

// update user
router.put("/:id",async(req,res)=>{
       if(req.body.userId === req.params.id || req.body.isAdmin){
                if(req.body.password){
                     try{
                         const salt=await bcrypt.genSalt(10);
                         req.body.password=await bcrypt.hash(req.body.password,salt);
                     }catch(err){
                         res.status(500).json(err); 
                     }
                }
                try{
                     const updateduser=await User.findByIdAndUpdate(req.params.id,{
                          $set:req.body
                     });
                     res.status(200).json("Account has been updated successfully");
                }catch(err){
                     res.status(500).json(err);
                }
       }else{
             return res.status(403).json("You can update only your account");
       }
});

// delete user
router.delete("/:id",async(req,res)=>{
     if(req.body.userId === req.params.id || req.body.isAdmin){            
              try{
                   const deleteuser=await User.deleteOne({_id:req.params.id});
                   res.status(200).json("Account has been deleted successfully");
              }catch(err){
                   res.status(500).json(err);
              }
     }else{
           return res.status(403).json("You can delete only your account");
     }
});
// get a user
router.get("/:id",async(req,res)=>{         
              try{
                   const user=await User.findById(req.params.id);
                   const {password,updatedAt,...other}=user._doc;
                   console.log(user._doc);
                   res.status(200).json(other);
              }catch(err){
                   res.status(500).json(err);
              }
});
// follow a user
router.put("/:id/follow",async(req,res)=>{
     if(req.body.userId !== req.params.id ){
          try{ 
            const userToFollow = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!userToFollow.followers.includes(req.body.userId)){
                  await userToFollow.updateOne({$push:{followers:req.body.userId}});
                  await currentUser.updateOne({$push:{followins:req.params.id}});
                  res.status(200).json("User has been followed");
            }else{
                 res.status(403).json("You already follow this user");
            }
          }catch(err){
               res.status(500).json(err);
          }
     }else{
          res.status(403).json("You can't follow yourself");
     }
});
// unfolow a user

router.put("/:id/unfollow",async(req,res)=>{
     if(req.body.userId !== req.params.id ){
          try{ 
            const userToUnFollow = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(userToUnFollow.followers.includes(req.body.userId)){
                  await userToUnFollow.updateOne({$pull:{followers:req.body.userId}});
                  await currentUser.updateOne({$pull:{followins:req.params.id}});
                  res.status(200).json("User has been unfollowed");
            }else{
                 res.status(403).json("You don't follow this user");
            }
          }catch(err){
               res.status(500).json(err);
          }
     }else{
          res.status(403).json("You can't unfollow yourself");
     }
});


module.exports =router;