const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema=new mongoose.Schema({
     title:String,
     content:String,
 }); 
 
const Note=mongoose.model("Note",notesSchema);

const mySchemas = {'Note':Note};

module.exports = mySchemas;