const express = require('express');
const app = express();

const port = 3000;

app.get("/",function(request,response){
    response.send("<h1>Hello World!</h1>");
});

app.get("/contact",function(request,response){
    response.send("<h1>My name is Nithin and I love to code.</h1>");
});

app.listen(3000,function(){
    console.log("Server has started on port 3000");
});