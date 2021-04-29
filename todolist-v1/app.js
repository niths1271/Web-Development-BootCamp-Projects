const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

let items=["Buy Food","Cook Food","Eat Food"];
let workItems=[];

app.get("/",function(req,res){
   
let day=date.getdate();

res.render("list",{listTitle:day,listItems:items,});

});

app.post("/",function(req,res){
if(req.body.button==="Work List"){
    workItems.push(req.body.newItem);
    res.redirect("/Work");
}else{
    items.push(req.body.newItem);
    res.redirect("/");
}
});

app.get("/Work",function(req,res){
  res.render("list",{listTitle:"Work List",listItems:workItems});
});



app.listen(3000,function(){
    console.log("Server started on port 3000");
});