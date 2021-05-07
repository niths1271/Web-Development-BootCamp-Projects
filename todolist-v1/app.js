const express=require("express");
const bodyParser=require("body-parser");
// const date=require(__dirname+"/date.js");
const mongoose=require("mongoose");
const lodash=require("lodash");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb+srv://niths1271:niths1271@nithincluster0.1jl3k.mongodb.net/todolistDB?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true,
  });

const itemsSchema=new mongoose.Schema({
    name:String,
}); 

const Item=mongoose.model("Item",itemsSchema);


const item1= new Item({
    name:"Buy food",
});
const item2= new Item({
    name:"Cook food",
});
const item3= new Item({
    name:"Eat food",
});

const defaultItems=[item1,item2,item3];

// let items=["Buy Food","Cook Food","Eat Food"];
// let workItems=[];

const listsSchema=new mongoose.Schema({
    name:String,
    items:[itemsSchema],
});

const List=mongoose.model("List",listsSchema);


app.get("/",function(req,res){

// let day=date.getdate();

Item.find(function(err,items){
    if(items.length === 0){
        Item.insertMany(defaultItems,function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Successful");
            }
        });
        res.redirect("/");
    }
    if(err){
        console.log(err);
    }else{
        res.render("list",{listTitle:"Today",listItems:items,});
    }
});

});

app.post("/",function(req,res){
    const listname=req.body.button;
    const listItem=new Item({
        name:req.body.newItem,
    });
if(listname==="Today"){
    listItem.save();
    res.redirect("/");
    }
 else{
    List.findOne({name:listname},function(err,list){
        list.items.push(listItem);
        list.save();
        res.redirect("/"+listname);
});
 }
});


app.post("/delete",function(req,res){
    const checkedItemId=req.body.checkbox;
    const listName=req.body.listname;
    if(listName==="Today"){
    Item.findByIdAndRemove(checkedItemId,function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Removed Successfully");
            res.redirect("/");
        }
    });
}else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}},function(err){
             if(!err){
                res.redirect("/"+listName);
             }
    });
}
});

app.get("/:customListName",function(req,res){

    const param=lodash.lowerCase(req.params.customListName);

List.findOne({name:param},function(err,list){
    if(!err){
        if(!list){
            const list= new List({
                name:param,
                items:defaultItems,
            });
            list.save();
            res.redirect("/"+list.name);
        }else{
           res.render("list",{listTitle:list.name,listItems:list.items,});
        }
    }
  });

    });

    let port = process.env.PORT;
    if (port == null || port == "") {
      port = 3000;
    }


app.listen(port,function(){
    console.log("Server started Successfully");
});