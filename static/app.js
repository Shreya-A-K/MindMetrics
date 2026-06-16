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
let lastClickTime = null;
let lastFlashTime = null;
let reactionTimes = [];
let waiting = false;
let totalInputs = 0;
let correctInputs = 0;
let errorPosition = null;
let levelIdx=0;

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
    lastFlashTime= Date.now();
    waiting=true;
    flash(btn);
    levelIdx=0;
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
    // Reaction time
    if (waiting && lastFlashTime!=null){
        reactionTimes.push(now - lastFlashTime);
        waiting = false;
    }

    // Inter Click Interval
    if (lastClickTime!=null){
        let ici = now - lastClickTime;
        interClickIntervals.push(ici);
    }
    lastClickTime=now;
    flash(event.target);
    userSeq.push(event.target.id);
    check(levelIdx);
    levelIdx++;
    
    console.log(`${event.target.id} Button was pressed!`);
}
function check(idx){
        totalInputs++;
        if (userSeq[idx]!==gameSeq[idx]){
            gameOver();
            return false;
        }else{
            correctInputs++;
        }
            
        if (userSeq.length==gameSeq.length){
            setTimeout(levelUp,500);
            return true;
        }
            
        
}

let allBtns= document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function gameOver(){
    // calculate error position 
    errorPosition=levelIdx+1;

    const sessionData = {
        reactionTimes,
        interClickIntervals,
        levelReached: level,
        score: 5 * correctInputs + 10 * errorPosition,
        mode: savedMode,
        accuracy: correctInputs/totalInputs,
        errorPosition
    };

    console.log(sessionData);



    h2.innerText = `Game Over! Scored : ${5 * correctInputs + 10 * errorPosition} points! Press any key to restart`;
    body.classList.add("body-error");
    setTimeout(()=>{
        body.classList.remove("body-error");
    },500);

    // Resetting analytics parameters 
    interClickIntervals = [];
    reactionTimes = [];
    lastClickTime = null;
    lastFlashTime = null;
    totalInputs=0;
    correctInputs=0;
    errorPosition=null;
    levelIdx=0;
    
    waiting = false;

    //Resetting the game parameters 
    level=0;
    userSeq=[];
    gameSeq=[];
    gameStart=false;
}

