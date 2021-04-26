const express = require('express');
const bodyParser=require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;

app.get('/',function (req,res)  {
  res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res){

var num1=Number(req.body.num1);
var num2=Number(req.body.num2);

var num3=num1+num2;

    res.send("Result:"+num3);
});

app.listen(port,function() {
  console.log(`Example app listening at http://localhost:${port}`)
});