var express = require('express');
const Schemas=require("../models/Schemas");
const router = express.Router();

const Note=Schemas.Note;


 router.get('/', async function (req,res){  
 await Note.find(function(err,notes){
     if(err){
         console.log(err);
     }else{
          res.json(notes);
     }
 });    
});


router.post('/createNote', async function (req,res){
    try{
    const newNote= new Note({
             title:req.body.title,
             content:req.body.content,
    });  
      await  newNote.save( (err)=>{
            if (err) res.end('Error Saving.');
            res.status(200).json("Added Note Successfully");
        });
    }catch(err){
        res.status(500).json(err);
    }
   });




router.delete('/deleteNote/:id', async function (req,res){
    try {
        const post = await Note.findById(req.params.id);
             await post.deleteOne();
             res.status(200).json("Note deleted successfully");
   } catch (err) {
        res.status(500).json(err);
   }
   });


module.exports =router;