var randomNumber1=(Math.floor(Math.random()*6))+1;
console.log(randomNumber1);
var randomNumber2=(Math.floor(Math.random()*6))+1;
console.log(randomNumber2);
var img1=document.querySelector(".img1");
var img2=document.querySelector(".img2");
img1.setAttribute("src","images/dice"+randomNumber1+".png");
img2.setAttribute("src","images/dice"+randomNumber2+".png");
if(randomNumber1>randomNumber2){
    document.querySelector("h1").innerHTML="🎉Player 1 Wins!";
}
else if(randomNumber1===randomNumber2){
    document.querySelector("h1").innerHTML="It's a Draw!";
}
else{
    document.querySelector("h1").innerHTML="🎉Player 2 Wins!";
}