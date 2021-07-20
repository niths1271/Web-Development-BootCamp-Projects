const router = require('express').Router();

const Post = require('../models/Post');
const User= require('../models/User');
//create a post
router.post("/", async (req, res) => {
     const newPost = new Post(req.body);
     try {
          const savedPost = await newPost.save();
          res.status(200).send(savedPost);
     } catch (err) {
          res.status(500).send(err);
     }
});
//update a post
router.put("/:id", async (req, res) => {
     try {
          const post = await Post.findById(req.params.id);
          if (post.userId === req.body.userId) {
               await post.updateOne({
                    $set: req.body
               });
               res.status(200).json("Post updated successfully");
          } else {
               res.status(403).json("You can update only your post");
          }
     } catch (err) {
          console.log(err);
     }
});
//delete a post
router.delete("/:id", async (req, res) => {
     try {
          const post = await Post.findById(req.params.id);
          if (post.userId === req.body.userId) {
               await post.deleteOne();
               res.status(200).json("Post deleted successfully");
          } else {
               res.status(403).json("You can delete only your post");
          }
     } catch (err) {
          res.status(500).json(err);
     }
});
//like or dislike the post
router.put("/:id/like", async (req, res) => {
     try {
          const post = await Post.findById(req.params.id);
          if(!post.likes.includes(req.body.userId)){
               await post.updateOne({$push:{likes:req.body.userId}});
               res.status(200).json("Post has been liked");
          }else{
               await post.updateOne({$pull:{likes:req.body.userId}});
               res.status(200).json("Post has been disliked");
          }
     } catch (err) {
          res.status(500).json(err);
     }
});

//get a post
router.get("/:id", async (req, res)=>{
     try{
           const post = await Post.findById(req.params.id);
           res.status(200).json(post);
     }catch(err){
          res.status(500).json(err);
     }
});

//get timeline posts
router.get("/timeline/:userId", async (req, res)=>{
     try{
       const currentUser= await User.findById(req.params.userId);
       const userPosts = await Post.find({userId:currentUser._id});
       const friendsPosts= await Promise.all(
            currentUser.followins.map((friendId)=>{
                  return Post.find({userId:friendId});
            }));
            res.status(200).json(userPosts.concat(...friendsPosts))
     }catch(err){
          res.status(500).json(err);
     }
});



module.exports = router;