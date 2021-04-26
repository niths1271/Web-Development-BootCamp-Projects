const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    console.log(req.body.cityName);

    const query=req.body.cityName;
const apikey="dd8bc544f92727ad8607239fbd4ee817";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;

https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
       const weatherData=JSON.parse(data);
       const temp=weatherData.main.temp;
       console.log(temp);
       const weatherDescription=weatherData.weather[0].description;
       console.log(weatherDescription);
       const img="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";

       res.write("<p>The weather is currently "+weatherDescription);
       res.write("<h1>The temparature in "+ query+ " is "+temp+"degree celsius</h1>");
       res.write("<img src=" +img+ ">");

       res.send();
    });
});
});




 
app.listen(port,function(){
  console.log("Server is running at port"+port);
});