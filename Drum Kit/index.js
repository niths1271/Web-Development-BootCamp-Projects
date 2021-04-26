function sound(char){
    switch(char){
        case 'w':
            var audio=new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case 'a':
            var audio=new Audio("sounds/tom-2.mp3");
             audio.play();
            break;
        case 's':
            var audio=new Audio("sounds/tom-3.mp3");
            audio.play();
            break;
        case 'd':
            var audio=new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
        case 'j':
            var audio=new Audio("sounds/snare.mp3");
            audio.play();
            break;
        case 'k':
            var audio=new Audio("sounds/crash.mp3");
            audio.play();
            break;
        case 'l':
            var audio=new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        default:
            console.log(char);
    }
}

function buttonAnimation(char){
    var activeButton=document.querySelector("."+char);

    activeButton.classList.add("pressed");

    setTimeout(function(){activeButton.classList.remove("pressed")},200);
}
for(var i=0;i<7;i++){
document.querySelectorAll("button")[i].addEventListener("click",function (){
    var char=this.innerHTML;
    sound(char);
    buttonAnimation(char);
});
}

document.addEventListener("keypress",function(event){
    console.log(event);
    sound(event.key);
    buttonAnimation(event.key);
});