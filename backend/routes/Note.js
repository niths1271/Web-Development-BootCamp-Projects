var express = require('express');
const Schemas=require("../models/Schemas");
const router = express.Router();

const Note=Schemas.Note;


 router.get('/', function (req,res){  
 Note.find(function(err,notes){
     if(err){
         console.log(err);
     }else{
          res.json(notes);
     }
 });    
});



router.post('/createNote', async function (req,res){
    const newNote= await new Note({
             title:req.body.title,
             content:req.body.content,
    });  
      await  newNote.save( (err)=>{
            if (err) res.end('Error Saving.');
            res.status(200).json("Added Note Successfully");
        });
   });



router.delete('/deleteNote/:id', async function (req,res){
    console.log(req.body);
   await Note.findByIdAndDelete(req.params.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
            res.status(200).json("Deleted Successfully");
        }
    });
   });


module.exports =router;