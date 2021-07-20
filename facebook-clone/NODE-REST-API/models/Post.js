const mongoose= require('mongoose');

const postSchema=new mongoose.Schema({
     userId:{
          type:String,
          require:true,
     },
     img:{
          type:String,
     },
     likes:{
          type:Array,
          default:[],
     },
     desc:{
          type:String,
          max:500,
     },
},
{timestamps:true}
);

module.exports = mongoose.model("Post",postSchema);