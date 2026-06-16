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
        gameStart=true;
        levelUp();     
    }
})
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText="Level "+level;
    let num = Math.floor(4*Math.random());
    let btn= availButtons[num];
    gameSeq.push(btn.id);
    flash(btn);
}
function flash(btn){
    
    let classAdded="flash";
    if (savedMode=="dark"){
        classAdded+="-dark";
    }
    btn.classList.add(classAdded);
    setTimeout(()=>{
        btn.classList.remove(classAdded);
        console.log(`${btn.id} flashed`);
    }
        ,250);
    
}
function btnPress(event){
    flash(event.target);
    userSeq.push(event.target.id);
    check();
    console.log(`${event.target.id} Button was pressed!`);
}
function check(){
        if (userSeq.length>gameSeq.length){
            h2.innerText = "Game Over! Press any key to restart";
            reset();
            return;
        }else{
            for (let i=0; i<userSeq.length; i++){
                if (userSeq[i]!==gameSeq[i]){
                    h2.innerText = "Game Over! Press any key to restart";
                    reset();
                    return;
                }
            }
            if (userSeq.length==gameSeq.length){
                setTimeout(levelUp,500);
            }
            
        }
}

let allBtns= document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    level=0;
    userSeq=[];
    gameSeq=[];
    gameStart=false;
}