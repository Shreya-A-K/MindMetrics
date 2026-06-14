let changeMode= document.querySelector(".mode-btn");
let body= document.querySelector("body");
let red= document.querySelector("#red");
let blue= document.querySelector("#blue");
let green= document.querySelector("#green");
let yellow= document.querySelector("#yellow");

changeMode.addEventListener("click",function(){
    body.classList.toggle("body-dark");
    red.classList.toggle("red-dark");
    blue.classList.toggle("blue-dark");
    green.classList.toggle("green-dark");
    yellow.classList.toggle("yellow-dark");

})
