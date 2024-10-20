const express= require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const multer  = require('multer');
const path=require("path");

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
//      console.log("Connected to MongoDB");
// });

mongoose.connect("mongodb://localhost:27017/socialDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true,
  }).then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});

app.use("/images",express.static(path.join(__dirname,"public/images")));

// middlewares
app.use(cors({
     origin:'http://localhost:3000',
   }));
app.use(express.json());//don't need to use bodyparser
app.use(helmet());
app.use(morgan("common"));

const storage=multer.diskStorage({ 
  destination:(req,file,cb)=>{
  cb(null,"public/images");
},
filename:(req,file,cb)=>{
  cb(null,req.body.name);
}
});

var upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
try{
return res.status(200).json("File uploaded successfully");
}catch(err){
console.log(err);
}
});


app.use("/api/users",usersRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);


app.listen(8000,()=>{
     console.log("Connected Successfully");
});