
var express = require('express');
const mongoose=require("mongoose");
const cors = require('cors');
var app = express();
const bodyParser=require("body-parser");
// view engine setup
// app.set('view engine', 'ejs');

app.use(express.json());

app.use("/api",require("./routes/Note"));
app.use(cors({
  origin:'http://localhost:3000',
}));

//Database connection
mongoose.connect("mongodb://localhost:27017/keeperappDB",{
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


const PORT=process.env.PORT || 8000;


app.listen(PORT, function(){
  const url= `http://localhost${PORT}/`;
  console.log(`Listening on url ${url}`);
});

module.exports = app;
