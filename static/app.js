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
let interClickIntervals = [];
let clickTimes = [];
let flashTimes = [];
let reactionTimes = [];
let waiting = false;

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
    flashTimes.push(Date.now());
    waiting=true;
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
    let now = Date.now();
    clickTimes.push(now);
    // Reaction time
    if (waiting){
        reactionTimes.push(now - flashTimes[flashTimes.length-1]);
        waiting = false;
    }

    // Inter Click Interval
    if (clickTimes.length > 1){
        let ici = now - clickTimes[clickTimes.length - 2];
        interClickIntervals.push(ici);
    }
    flash(event.target);
    userSeq.push(event.target.id);
    check();
    console.log(`${event.target.id} Button was pressed!`);
}
function check(){
        if (userSeq.length>gameSeq.length){
            gameOver();
            return;
        }else{
            for (let i=0; i<userSeq.length; i++){
                if (userSeq[i]!==gameSeq[i]){
                    gameOver();
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

function gameOver(){
    h2.innerText = `Game Over! Scored : ${5*level} points! Press any key to restart`;
    body.classList.add("body-error");
    setTimeout(()=>{
        body.classList.remove("body-error");
    },500);
    console.log({
        reactionTimes,
        interClickIntervals
    });

    // Resetting analytics parameters 
    interClickIntervals = [];
    clickTimes = [];
    flashTimes = [];
    reactionTimes = [];
    waiting = false;

    //Resetting the game parameters 
    level=0;
    userSeq=[];
    gameSeq=[];
    gameStart=false;
}

