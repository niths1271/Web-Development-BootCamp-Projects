const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true,
  });

  const articlesSchema=new mongoose.Schema({
    title:String,
    content:String,
}); 

const Article=mongoose.model("Article",articlesSchema);


app.route("/articles")

.get(function(req,res){
    Article.find({},function(err,articles){
        if(err){
            res.send(err);
        }
        res.send(articles);
    });
})

.post(function(req,res){
    // console.log(req.body.title);
    // console.log(req.body.content);
const newArticle=new Article({
         title:req.body.title,
         content:req.body.content,
});
newArticle.save(function(err){
    if(!err){
        res.send("Successfully added a new article");
    }
    else{
        res.send(err);
    }
});
})

.delete(function(req,res){
Article.deleteMany(function(err){
    if(!err){
        res.send("Deleted Successfully");
    }else{
        res.send(err);
    }
});
});

///////////////////////////////////////Requests Targeting all Articles///////////////////////////

app.route("/articles/:articleName")

.get(function(req,res){
    const articleName=req.params.articleName;
    Article.findOne({title:articleName},function(err,article){
        if(!err){
        res.send(article);
        }else{
            res.send(err);
        }
    });
})

.put(function(req,res){
    const articleName=req.params.articleName;
    Article.update(
        {title:articleName},
        {title:req.body.title,content:req.body.content},
        {overwrite:true},function(err){
             if(!err){
                 res.send("Successfully updated the article");
             }else{ 
                 res.send(err);
             }
        });
})

.patch(function(req,res){
    const articleName=req.params.articleName;
    Article.update(
        {title:articleName},
        {$set:req.body},function(err){
             if(!err){
                 res.send("Successfully updated the article");
             }else{ 
                 res.send(err);
             }
        });
})

.delete(function(req,res){
    const articleName=req.params.articleName;
    Article.deleteOne({title:articleName},function(err){
        if(!err){
            res.send("Deleted Successfully");
        }else{
            res.send(err);
        }
    });
    });


app.listen(port,function(){
    console.log("Server started Successfully");
});