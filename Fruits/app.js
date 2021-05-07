const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const fruitSchema=new mongoose.Schema({
   name:{
       type:String,
       required:[true,'Name should be entered'],
   },
   rating:{
       type:Number,
       min:1,
       max:10
   },
   review:String,
});

const Fruit= mongoose.model("Fruit",fruitSchema);

const fruit1= new Fruit({
    name:"Litchi",
    rating:10,
    review:"Pretty solid as a fruit",
});

 fruit1.save();

// Fruit.updateOne({_id:"608ae6d9fd65309ca87d9c4d"},{name:"Peach",rating:3},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Updated Successfully");
//     }
// });

// Fruit.deleteOne({name:"Peach"},function(err){
//     if(err){
//         console.log(err);
//         }else{
//             console.log("Deleted Successfully");
//         }
// });

// mongoose.connection.close();
// const fruit2= new Fruit({
//     name:"Pineapple",
//     rating:4,
//     review:"Ok Ok",
// });

// const fruit3= new Fruit({
//     name:"banana",
//     rating:8,
//     review:"Not so bad",
// });

// const fruit4= new Fruit({
//     name:"Mango",
//     rating:9,
//     review:"mouth watering",
// });

// Fruit.insertMany([fruit1,fruit2,fruit3,fruit4],function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Successful");
//     }
// });

const personSchema=new mongoose.Schema({
    name:String,
    age:Number,
    favouritefruit:fruitSchema,
});

const Person=mongoose.model("Person",personSchema);

const person1=new Person({
    name:"Nithin.c",
    age:19,
    favouritefruit:fruit1,
});

 person1.save();

// Fruit.find(function(err,fruits){
//     if(err){
//         console.log(err);
//     }else{
//         for(var i=0;i<fruits.length;i++)
//         console.log(fruits[i].name);
//     }
// });





/*
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});*/