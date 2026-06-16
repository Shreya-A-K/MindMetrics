let changeMode= document.querySelector(".mode-btn");
let body= document.querySelector("body");
let red= document.querySelector("#red");
let blue= document.querySelector("#blue");
let green= document.querySelector("#green");
let yellow= document.querySelector("#yellow");
let h2= document.querySelector("h2");
let gameSeq=[];
let userSeq=[];
let availButtons = [red,blue,green,yellow];
let level=0;
let gameStart=false;
let waiting= false;
let savedMode = localStorage.getItem("mode");

if (savedMode === "dark") {
    body.classList.add("body-dark");
    red.classList.add("red-dark");
    blue.classList.add("blue-dark");
    green.classList.add("green-dark");
    yellow.classList.add("yellow-dark");
    changeMode.classList.add("mode-btn-dark");
}

changeMode.addEventListener("click",function(){
    body.classList.toggle("body-dark");
    red.classList.toggle("red-dark");
    blue.classList.toggle("blue-dark");
    green.classList.toggle("green-dark");
    yellow.classList.toggle("yellow-dark");
    this.classList.toggle("mode-btn-dark");
    if (body.classList.contains("body-dark")) {
        localStorage.setItem("mode", "dark");
        savedMode="dark";
    } else {
        localStorage.setItem("mode", "light");
        savedMode="light";
    }

})
document.addEventListener("keypress",function(){
    if (!gameStart){
        level++;
        gameStart=true;
        h2.innerText="Level "+level;
        let num = Math.floor(4*Math.random());
        gameSeq.push(availButtons[num].id);
        flash(num);
        waiting=true;
        
    }
})
function flash(num){

    let classAdded="flash";
    if (savedMode=="dark"){
        classAdded+="-dark";
    }
    availButtons[num].classList.add(classAdded);
    setTimeout(()=>{
        availButtons[num].classList.remove(classAdded);
        console.log("flashed");
    }
        ,400);
    
}
if (gameStart && !waiting){
    let num = Math.floor(4*Math.random());
    gameSeq.push(availButtons[num]);
    flash(num);
    waiting=true;
}