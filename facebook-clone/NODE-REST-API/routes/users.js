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
router.get("/",async(req,res)=>{
           const userId=req.query.userId;
           const username=req.query.username;   
              try{
                   const user=userId?await User.findById(userId):await User.findOne({username:username});
                   const {password,updatedAt,...other}=user._doc;
                   console.log(user._doc);
                   res.status(200).json(other);
              }catch(err){
                   res.status(500).json(err);
              }
});

//get friends
router.get("/friends/:userId",async(req,res)=>{
     try{
const user = await User.findById(req.params.userId);
       const friends= await Promise.all(
          user.followins.map((friendId)=>{
                return User.findById(friendId);
          }));
          let friendList=[];
          friends.map((friend)=>{
const {_id,username,profilePicture}=friend;
 friendList.push({_id,username,profilePicture});
          });
          res.status(200).json(friendList);
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
// unfollow a user

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