const express= require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
     console.log("Connected to MongoDB");
});


// middlewares
app.use(cors({
     origin:'http://localhost:3000',
   }));
app.use(express.json());//don't need to use bodyparser
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",usersRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);


app.listen(8000,()=>{
     console.log("Connected Successfully");
});